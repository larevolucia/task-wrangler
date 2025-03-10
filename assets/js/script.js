/* jshint esversion: 6 */

import { showToast } from "./notification.js";
import {
  getTasksFromStorage,
  formatDate,
  getTodayDate,
  getStatusClass,
  addEventListeners,
  trapFocus,
  createEscapeKeyHandler,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

// Global variable saved to return focus
const contentContainer = document.getElementById("content-container");

// Add event listener to the create-task button
const createTaskButton = document.getElementById("create-task");

if (createTaskButton) {
  createTaskButton.addEventListener("click", showCreateTaskForm);
}

// Global variables to manage modal states and prevent multiple instances
let createTaskContainer = null; // Stores the task creation form instance
let taskListContainer = document.getElementById("tasks-container"); // Stores the task creation form instance
let editTaskContainer = null; // Stores the edit task form instance
let taskDetailsContainer = null; // Stores the task details modal instance
let confirmationModal = null; // Stores the confirmation modal instance

// Tracks the last focused element before a modal is opened, ensuring proper keyboard navigation
let lastFocusedEl = document.getElementById("home-navigation");

// Get today's date in YYYY-MM-DD format for task due date validation
const today = getTodayDate();

/* CREATE TASKS */

// Create form for task creation
function showCreateTaskForm() {
  lastFocusedEl = createTaskButton;

  //  Check if form already exists
  if (createTaskContainer) {
    createTaskContainer.classList.toggle("show");
    return;
  }

  // Create the task form container
  createTaskContainer = createTaskFormContainer();
  contentContainer.appendChild(createTaskContainer);

  // Trap focus
  document.addEventListener("keydown", (event) =>
    trapFocus(event, "create-task-form-container")
  );

  document.getElementById("task-title").focus();

  // Add event listeners for form actions
  addCreateTaskEventListeners();
}

// Function to create form element
function createTaskFormContainer() {
  const container = document.createElement("div");
  container.id = "create-task-form-container";
  container.classList.add("show");
  container.innerHTML = `
    <form id="create-task-form" novalidate>
    <div class="modal-header">
    <button type="button" id="close-create-form">&times;</button>
    <h2>Add Task</h2>
    </div>
    <div class="modal-body">
    <div class="form-item">
    <label for="task-title">Title<small>*</small></label>
    <input type="text" id="task-title" aria-required="true">
    <span id="task-title-error" class="error-message" aria-live="assertive"></span>
    </div>
    <div class="form-item">
    <label for="task-description">Description</label>
    <textarea id="task-description"></textarea>
    </div>
    <div class="form-item">
    <label for="task-date">Due Date</label>
    <input type="date" id="task-date" min="${getTodayDate()}">
    <span id="task-date-error" class="error-message" aria-live="assertive"></span>
    </div>
    </div>
    <div class="modal-footer">
    <button type="button" id="close-create-modal">Cancel</button>
    <button type="submit" class="btn-primary">Create Task</button>
    </div>
    </form>
    `;
  return container;
}

// Save task to localStorage
function createTask(event) {
  event.preventDefault();

  // Validate form before proceeding
  if (!isFormValid("task-title", "task-date")) {
    return; // Stop form submission if validation fails
  }

  const title = document.getElementById("task-title").value;
  const dueDate = document.getElementById("task-date").value;
  const description = document.getElementById("task-description").value;

  // Load existing tasks from localStorage; default to an empty array if none exist
  let tasks = getTasksFromStorage();

  // Create new task object
  const task = {
    id: Date.now(), // timestamp used as id
    title,
    dueDate,
    description,
    status: "to-do", // Default status
  };

  // Add task to the end of array and save to localStorage
  tasks.push(task);

  try {
    // Attempt to save the task list to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showToast(
      "Task added successfully!",
      "success",
      4000,
      lastFocusedEl,
      createTaskButton
    ); // Feedback to user
    closeModal();
    // Immediately update the task list
    loadTasks();
  } catch (error) {
    // Handle storage errors
    showToast(
      "Failed to save task. Please try again.",
      "danger",
      4000,
      lastFocusedEl,
      createTaskButton
    );
  }
}

function addCreateTaskEventListeners() {
  addEventListeners(
    ["close-create-form", "close-create-modal"],
    "click",
    closeModal
  );
  document.addEventListener("keydown", createEscapeKeyHandler(closeModal));
  addEventListeners(["create-task-form"], "submit", createTask);
}

/* LOAD TASK LIST */

// Handle No Task Scenario
function handleEmptyTaskList(container) {
  container.innerHTML = `<p id="no-tasks-message" class="empty-message">No tasks yet! <span class="custom-anchor" id="create-task-trigger">Create a task</span> to get started.</p>`;
  container.removeAttribute("role"); // Remove role="list" if no tasks exist
  // Add event listener to the empty state message
  addEventListeners(["create-task-trigger"], "click", showCreateTaskForm);
}

// Retrieve task list from localStorage
function loadTasks() {
  if (!taskListContainer) {
    console.warn("loadTasks() called but #tasks-container does not exist.");
    return;
  }

  taskListContainer.innerHTML = ""; // Clear the existing tasks

  let tasks = [];

  try {
    // Retrieve tasks from localStorage
    tasks = getTasksFromStorage();
  } catch (error) {
    // Handle storage errors
    showToast(
      "Failed to load tasks. Resetting task list.",
      "danger",
      4000,
      lastFocusedEl,
      taskListContainer
    );
    localStorage.removeItem("tasks");
  }

  if (tasks.length === 0) {
    taskListContainer.classList.add("flex-tasks-container");
    handleEmptyTaskList(taskListContainer);
    return;
  } else {
    taskListContainer.classList.remove("flex-tasks-container");
  }

  taskListContainer.setAttribute("role", "list"); // Add role="list" if there are items
  renderTaskList(tasks, taskListContainer);
}

// Function to render tasks
function renderTaskList(tasks, container) {
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index);
    container.appendChild(taskElement);
    addTaskEventListeners(taskElement, task);
  });
}

// Function to create a task element
function createTaskElement(task, index) {
  const newDate = formatDate(task.dueDate);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(today);
  const taskTitleId = `task-title-${index}`;
  const taskElement = document.createElement("div");

  taskElement.classList.add("task-card");
  taskElement.setAttribute("role", "listitem");
  taskElement.setAttribute("tabindex", "0");
  taskElement.setAttribute("id", `task-${task.id}`);
  taskElement.setAttribute("aria-labelledby", taskTitleId);

  const statusClass = getStatusClass(task.status || "unknown");

  if (task.status !== "done" && isOverdue) {
    taskElement.classList.add("overdue");
  }

  taskElement.innerHTML = `
      <div class="status-box">
        <span class="task-status ${statusClass}" tabindex="0">
        ${task.status || "N/A"}
        </span>
      </div>
      ${
        task.dueDate ? task.status !== "done" && isOverdue  ? `<div class="task-due-date date-box">
          <i class="fa-solid fa-triangle-exclamation"></i> 
          <i class="fa-solid fa-calendar-days"></i>
          <span class="task-due-date-text">${newDate}</span>
        </div>`
            : `<div class="task-due-date date-box">
        <i class="fa-regular fa-calendar-days"></i>
        <span class="task-due-date-text">${newDate}</span>
        </div>`
          : `<div class="date-box"></div>`
      }
      <div class="title-box">
        <span class="task-title" id="${taskTitleId}">${task.title}</span>
        ${
          task.description ? `<span class="task-description-icon"><i class="fa-solid fa-align-left"></i></span>`
            : ""
        }
      </div>
      <div class="edit-box">
        <button class="edit-task" id="edit-${
          task.id
        }" title="Edit Task" data-id="${task.id}" aria-label="Edit ${
    task.title
  }"><i class="fa-solid fa-pen"></i></button>
      </div>
      <div class="delete-box">
        <button class="delete-task" id="delete-${
          task.id
        }" title="Delete Task" data-id="${task.id}" data-title="${
    task.title
  }" aria-label="Delete ${
    task.title
  }"><i class="fa-solid fa-trash"></i></button>
      </div>
  `;
  // Add inline edit listener for status
  const statusSpan = taskElement.querySelector(".task-status");
  if (statusSpan) {
    statusSpan.addEventListener("click", (event) => {
      event.stopPropagation();
      enableInlineStatusEdit(task, taskElement);
    });
  }
  // Listen for keydown to trigger inline editing
  statusSpan.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      enableInlineStatusEdit(task, taskElement);
    }
  });

  return taskElement;
}

// Function to add event listeners to a task element
function addTaskEventListeners(taskElement, task) {
  if (!task.id) {
    console.error("Invalid task: Missing ID", task);
    showToast(
      "Something went wrong. Invalid Task.",
      "warning",
      4000,
      lastFocusedEl,
      taskListContainer
    );
    return;
  }
  taskElement.addEventListener("click", function (event) {
    if (
      !event.target.closest(".edit-task") &&
      !event.target.closest(".delete-task") &&
      !event.target.closest(".status-box")
    ) {
      showTaskDetails(task);
    }
  });

  taskElement.addEventListener("keydown", (event) => {
    if (
      !event.target.closest(".edit-task") &&
      !event.target.closest(".delete-task") &&
      !event.target.closest(".status-box")
    ) {
      if (event.key === "Enter") {
        event.preventDefault();
        showTaskDetails(task);
      }
    }
  });

  // Add event listeners for edit button
  const editButton = document.getElementById(`edit-${task.id}`);
  if (editButton) {
    addEditButtonListener(editButton, task.id);
  }

  // Add event listeners for delete button
  const deleteButton = document.getElementById(`delete-${task.id}`);
  if (deleteButton) {
    addDeleteButtonListener(deleteButton, task);
  }
}

// Function to add event listeners for the edit button
function addEditButtonListener(editButton, taskId) {
  editButton.addEventListener("click", function () {
    showEditTaskForm(taskId);
  });

  editButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      showEditTaskForm(taskId);
    }
  });
}

// Function to add event listeners for the delete button
function addDeleteButtonListener(deleteButton, task) {
  deleteButton.addEventListener("click", function () {
    showConfirmDelete(
      "delete",
      "Delete confirmation",
      `Are you sure you want to delete <em><strong>${this.dataset.title}</strong></em>?`,
      task.id
    );
  });

  deleteButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      showConfirmDelete(
        "delete",
        "Delete confirmation",
        `Are you sure you want to delete <em><strong>${this.dataset.title}</strong></em>?`,
        task.id
      );
    }
  });
}

/* SHOW TASK DETAILS */

// Retrieve details of specific task from localStorage
function showTaskDetails(task) {
  lastFocusedEl = document.getElementById(`task-${task.id}`);

  // Remove existing task details if any
  if (taskDetailsContainer) {
    taskDetailsContainer.remove();
  }

  taskDetailsContainer = createTaskDetailsContainer(task);
  contentContainer.appendChild(taskDetailsContainer);

  // Trap focus
  document.addEventListener("keydown", (event) =>
    trapFocus(event, `task-${task.id}-details-container`)
  );

  document.getElementById(`edit-task-${task.id}`).focus();

  // Add Event Listeners
  addTaskDetailsEventListeners(task);
}

// Function to create task details element
function createTaskDetailsContainer(task) {
  const statusClass = getStatusClass(task.status);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(today);

  // Create modal container
  const container = document.createElement("div");
  container.id = `task-${task.id}-details-container`;
  container.classList.add("task-details-container");
  container.classList.add("details-modal");
  container.classList.add("show");
  container.innerHTML = `
  <div id="details-modal-content">
  <div class="modal-header">
  <button id="close-details-modal">&times;</button>
  <h2>${task.title}</h2>
  </div>
  <div class="modal-body">
  <div class="details-item"><span class="task-status ${statusClass}">${
    task.status
  }</span></div>
  ${
    task.description ? `<div class="details-item"><p><strong>Description</strong></p><p>${task.description}</p></div>`
      : ""
  }
  ${
    task.dueDate ? task.status !== "done" && isOverdue  ? `<div class="details-item">
       <p><i class="fa-solid fa-triangle-exclamation"></i> <strong>Due Date</strong></p> 
       <p>${formatDate(task.dueDate)}</p>
    </div>`
        : `<div class="details-item"><p><strong>Due Date</strong></p> <p>${formatDate(
            task.dueDate
          )}</p></div>`
      : ""
  }    
      </div>
      <div class="modal-footer">
      <button class="btn-danger" id="delete-task-${
        task.id
      }" title="Delete Task" data-id="${task.id}" aria-label="Delete ${
    task.title
  }">Delete Task</button>
      <button class="btn-primary" id="edit-task-${
        task.id
      }" title="Edit Task" data-id="${
    task.id
  }" aria-label="Edit ">Edit Task</button>
      </div>
      </div>
      `;

  return container;
}

// Function to add event listeners
function addTaskDetailsEventListeners(task) {
  // Add event listeners for edit button
  document
    .getElementById(`edit-task-${task.id}`)
    .addEventListener("click", function () {
      showEditTaskForm(this.dataset.id);
    });

  // Add event listeners for delete button
  document
    .getElementById(`delete-task-${task.id}`)
    .addEventListener("click", function () {
      showConfirmDelete(
        "delete",
        "Delete confirmation",
        `Are you sure you want to delete <em><strong>${task.title}</strong></em>?`,
        this.dataset.id
      );
    });

  document
    .getElementById("close-details-modal")
    .addEventListener("click", closeModal);
  // Close modal when the Escape key is pressed, ensuring users can dismiss dialogs with the keyboard
  document.addEventListener("keydown", createEscapeKeyHandler(closeModal));
}

/* EDIT TASK DETAILS */

// Function to enable Status update without navigating to Edit Form
function enableInlineStatusEdit(task, taskElement) {
  const statusBox = taskElement.querySelector(".status-box");
  if (!statusBox) return;

  // Create a select element and populate with generateStatusOptions
  const select = document.createElement("select");
  select.id = `inline-status-${task.id}`;
  select.classList.add("select-status");
  select.name = "status";
  select.innerHTML = generateStatusOptions(task);

  // Replace span with select
  statusBox.innerHTML = "";
  statusBox.appendChild(select);
  select.focus();

  //Store initial status for non-commited changes
  const initialStatus = task.status;

  // Track changes for committed status
  let mouseInteraction = false;
  let keyboardInteraction = false;
  let committed = false;

  select.addEventListener("mousedown", () => {
    mouseInteraction = true;
  });

  // Handle status change for mouse users
  select.addEventListener("change", () => {
    if (mouseInteraction) {
      const newStatus = select.value;
      updateTaskStatus(task.id, newStatus);
      showToast(
        "Status updated successfully!",
        "success",
        4000,
        lastFocusedEl,
        taskElement
      );
      committed = true;
      loadTasks();
    }
  });

  //Handle input event for better mobile compatibility
  select.addEventListener("input", () => {
    if (!keyboardInteraction) { 
      updateTaskStatus(task.id, select.value);
      showToast("Status updated successfully!", "success", 4000, lastFocusedEl, taskElement);
      committed = true;
      loadTasks();
    }
  });


  // Handle status change for keyboard users
  select.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      keyboardInteraction = true;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      updateTaskStatus(task.id, select.value);
      showToast("Status updated successfully!", "success", 4000, taskElement, taskListContainer);
      committed = true;
      loadTasks();
    } else if (event.key === "Escape") {
      event.preventDefault();
      select.value = initialStatus; // Restore the original status
      loadTasks();
    }
  });

   // Handle focus lost
  select.addEventListener("blur", () => {
    if (!committed) {
      loadTasks();
    }
  });

  // Handle global Escape key 
  select.addEventListener("keydown", createEscapeKeyHandler(() => {
    loadTasks();
  }));

}

// Function to update status on localStorage
function updateTaskStatus(taskId, newStatus) {
  let tasks = getTasksFromStorage();
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Preloads task information into form for manipulation
function showEditTaskForm(taskId) {
  closeModal();

  lastFocusedEl = document.getElementById(`edit-${taskId}`);

  // Retrieve task details
  const currentTask = getTaskById(taskId);
  if (!currentTask) {
    showToast(
      "Task not found!",
      "danger",
      4000,
      lastFocusedEl,
      taskListContainer
    );
    return;
  }

  // Create form container
  editTaskContainer = createEditTaskFormContainer(currentTask);
  contentContainer.appendChild(editTaskContainer);

  // Trap focus
  document.addEventListener("keydown", (event) =>
    trapFocus(event, "edit-task-form-container")
  );
  document.getElementById("new-status").focus();

  // Add Event Listeners
  addEditTaskEventListeners(taskId);
}

// Function to get task by ID
function getTaskById(taskId) {
  const tasks = getTasksFromStorage();
  return tasks.find((task) => task.id === Number(taskId)) || null;
}

// Function to get Task Status
function generateStatusOptions(task) {
  const statusOptions = ["to-do", "in progress", "done"];

  return statusOptions
    .map(
      (status) => `
        <option value="${status}" ${
        task.status === status ? "selected" : ""
      }>${status}</option>
    `
    )
    .join("");
}

// Create edit form element
function createEditTaskFormContainer(task) {
  // define possible status
  const statusSelectOptions = generateStatusOptions(task);

  // Allow past dates if the task is overdue, otherwise set min date to today
  const isOverdue = task.dueDate && task.dueDate < today;
  const minDate = isOverdue ? `min=${task.dueDate}` : `min="${today}"`;

  // Create a form container div
  let container = document.createElement("div");
  container.id = "edit-task-form-container";
  container.classList.add("show");
  container.innerHTML = `
      <form id="edit-task-form" data-id="${task.id}" novalidate>
      <div class="modal-header">
              <button type="button" id="close-edit-form">&times;</button>
              <h2>Edit Task</h2>
          </div>
          <div class="modal-body">
              <div class="form-item">
                  <label for="new-status">Status</label>
                  <select id="new-status" name="status">
                  ${statusSelectOptions}
                  </select>
              </div>
              <div class="form-item">
                  <label for="new-task-title">Title<small>*</small></label>
                  <input type="text" id="new-task-title" placeholder="Task Title" value="${
                    task.title
                  }" aria-required="true">
                  <span id="new-task-title-error" class="error-message" aria-live="assertive"></span>
                  </div>
                  <div class="form-item">
                  <label for="new-task-description">Description</label>
                  <textarea id="new-task-description">${
                    task.description ? task.description : ""
                  }</textarea>
                  </div>
                  <div class="form-item">
                  <label for="new-task-date">Due Date</label>
                  <input type="date" id="new-task-date" value="${
                    task.dueDate
                  }" ${minDate}>
                  <span id="new-task-date-error" class="error-message" aria-live="assertive"></span>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" id="close-edit-modal">Discard Changes</button>
              <button type="submit" class="btn-primary">Save Changes</button>
          </div>
      </form>
  `;

  return container;
}

// Remove task from localStorage and replace it with modified version
function editTask(event, taskId) {
  event.preventDefault();

  // Validate form before proceeding
  if (!isFormValid("new-task-title", "new-task-date")) {
    return; // Stop form submission if validation fails
  }

  const title = document.getElementById("new-task-title").value;
  const dueDate = document.getElementById("new-task-date").value;
  const status = document.getElementById("new-status").value;
  const description = document.getElementById("new-task-description").value;

  try {
    // retrieve stored tasks
    let tasks = getTasksFromStorage();

    // Find the index of the task to edit
    const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));

    // Save updated tasks array back to localStorage if changes are made
    if (
      tasks[taskIndex].title !== title ||
      tasks[taskIndex].dueDate !== dueDate ||
      tasks[taskIndex].status !== status ||
      tasks[taskIndex].description !== description
    ) {
      // Update task properties
      tasks[taskIndex].title = title;
      tasks[taskIndex].dueDate = dueDate;
      tasks[taskIndex].status = status;
      tasks[taskIndex].description = description;

      localStorage.setItem("tasks", JSON.stringify(tasks));
      showToast(
        "Task edited successfully!",
        "success",
        4000,
        lastFocusedEl,
        taskListContainer
      );
      loadTasks();
    } else {
      showToast(
        "No changes made.",
        "info",
        4000,
        lastFocusedEl,
        taskListContainer
      );
    }

    closeModal();

    // Refresh task list on page
    loadTasks();
  } catch (error) {
    // Handle storage errors
    showToast(
      "Failed to edit task. Please try again.",
      "danger",
      4000,
      lastFocusedEl,
      taskListContainer
    );
  }
}

// Function to add event listeners for edit form
function addEditTaskEventListeners(taskId) {
  addEventListeners(
    ["close-edit-form", "close-edit-modal"],
    "click",
    closeModal
  );
  document.addEventListener("keydown", createEscapeKeyHandler(closeModal));
  // Ensure the edit form has the correct taskId in dataset
  const editForm = document.getElementById("edit-task-form");
  if (editForm) {
    editForm.dataset.id = taskId; // Store the task ID in the form
  }
  addEventListeners(["edit-task-form"], "submit", (event) =>
    editTask(event, taskId)
  );
}

/* DELETE TASK */

// Show confirmation modal for critical action
function showConfirmDelete(action, title, message, taskId) {
  closeModal();

  lastFocusedEl = document.getElementById(`delete-${taskId}`);

  confirmationModal = createConfirmationModal(action, title, message, taskId);
  contentContainer.appendChild(confirmationModal);

  // Trap focus
  document.addEventListener("keydown", (event) =>
    trapFocus(event, `${action}-confirmation-modal`)
  );
  document.getElementById("cancel-delete").focus();

  // Add Event Listeners
  addConfirmDeleteEventListeners(taskId);
}

// Function to create confirmation modal element
function createConfirmationModal(action, title, message) {
  const container = document.createElement("div");
  container.id = `${action}-confirmation-modal`;
  container.classList.add("confirmation-modal");
  container.classList.add("show");
  container.innerHTML = `
    <div class="confirm-modal-content">
    <button type="button" id="close-confirm-modal">&times;</button>
    <div class="modal-header">
    <h2>${title}</h2>
    </div>
    <div class="modal-body">
       <p>${message}</p>
    </div>
    <div class="modal-footer">
        <button id="cancel-delete">Cancel</button>
        <button id="confirm-delete" class="btn-danger">Yes, Delete</button>
    </div>
    </div>`;
  return container;
}

// Function to add event listeners for delete confirmation modal
function addConfirmDeleteEventListeners(taskId) {
  // Close modal if "Cancel" or "X" is clicked
  addEventListeners(
    ["cancel-delete", "close-confirm-modal"],
    "click",
    closeModal
  );

  // Close modal when Escape key is pressed
  document.addEventListener("keydown", createEscapeKeyHandler(closeModal));

  // Confirm delete when "Yes" is clicked
  document.getElementById("confirm-delete").addEventListener("click", () => {
    if (taskId !== null) {
      deleteTask(taskId);
      closeModal();
      taskId = null; // Reset
    }
  });
}

// Delete task from localStorage
function deleteTask(taskId) {
  // alert for taskID null or undefined
  if (!taskId) {
    showToast(
      "Error: Invalid task ID.",
      "danger",
      4000,
      lastFocusedEl,
      taskListContainer
    );
    return;
  }
  try {
    // retrieve stored tasks, if there is no tasks default to empty array
    let tasks = getTasksFromStorage();
    // create new array filtering out the task with given taskId
    tasks = tasks.filter((task) => task.id != taskId);

    // save updated task lists to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Feedback to user
    showToast(
      "Task deleted successfully!",
      "success",
      4000,
      lastFocusedEl,
      taskListContainer
    );
    // Refresh task list on page
    loadTasks();
  } catch (error) {
    showToast(
      "Failed to delete task. Please try again.",
      "danger",
      4000,
      lastFocusedEl,
      taskListContainer
    );
  }
}

/* FORM VALIDATION */

// Validate form inputs for task title and due date
function isFormValid(titleId, dateId) {
  const titleInput = document.getElementById(titleId);
  const title = document.getElementById(titleId).value.trim();
  const dueDateInput = document.getElementById(dateId);
  const dueDate = dueDateInput.value;
  const minDate = dueDateInput.min;

  // Ensure title is provided
  if (!title) {
    showToast(
      "Title is a required field.",
      "warning",
      4000,
      lastFocusedEl,
      titleInput
    );
    markField(titleId, "This field is required.");
    return false;
  }

  // Ensure dueDate is not before configured earliest date
  if (new Date(dueDate) < new Date(minDate)) {
    showToast(
      "The due date cannot be in the past.",
      "warning",
      4000,
      lastFocusedEl,
      dueDateInput
    );
    markField(dateId, `Date cannot be before ${formatDate(minDate)}`);
    return false;
  }

  return true;
}

// Add class to validated field for highligth
function markField(fieldId, message) {
  let field = document.getElementById(fieldId);
  let errorMessage = document.getElementById(`${fieldId}-error`);

  field.classList.add("error-border");
  errorMessage.innerHTML = message;
  document.getElementById(fieldId).focus();

  // Remove error class when user starts typing
  field.addEventListener(
    "input",
    () => {
      field.classList.remove("error-border");
      document.getElementById(`${fieldId}-error`).textContent = "";
    },
    { once: true }
  );
}

/* MODAL INTERACTION */

// Close forms & details modals
function closeModal() {
  let allModals = [
    createTaskContainer,
    editTaskContainer,
    taskDetailsContainer,
    confirmationModal,
  ];

  allModals.forEach((modal) => {
    if (modal) {
      modal.classList.remove("show");
      modal.remove();
    }
  });

  createTaskContainer = null;
  editTaskContainer = null;
  taskDetailsContainer = null;
  confirmationModal = null;

  document.removeEventListener("keydown", trapFocus);

  if (!document.activeElement || document.activeElement === document.body) {
    if (lastFocusedEl && document.contains(lastFocusedEl)) {
      lastFocusedEl.focus();
    } else {
      taskListContainer.focus();
    }
  }
}
