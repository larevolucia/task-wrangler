document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    showProgressBar();
    loadTasks();
});

const contentContainer = document.getElementById("content-container");
const createTaskButton = document.getElementById("create-task");

// Add event listener to the create-task button
createTaskButton.addEventListener("click", showCreateTaskForm);

// Store containers globally
let createTaskFormContainer;
let editTaskFormContainer; 
let taskDetailsContainer; 
let confirmationModal; 

// Store today's date
const today = getTodayDate();


// Populate Progress Bar
function showProgressBar(){
    // Show Progress Bar
    const progressContainer = document.getElementById("progress-container");
    progressContainer.ariaValueNow = "25";
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "25%";

}

// Create form for task creation
function showCreateTaskForm () {
    
    //  Check if form already exists
    if (createTaskFormContainer) {
        createTaskFormContainer.classList.toggle("show"); 
        return;
    }
    
    // Create a form container div
    createTaskFormContainer = document.createElement("div");
    createTaskFormContainer.id = "create-task-form-container";
    createTaskFormContainer.classList.add("show");
    createTaskFormContainer.innerHTML = `
    <form id="create-task-form">
    <div class="modal-header">
    <button type="button" id="close-create-form">&times;</button>
    <h2>Add Task</h2>
    </div>
    <div class="modal-body">
    <div class="form-item">
    <label for="task-title">Title<small>*</small></label>
    <input type="text" id="task-title">
    <span id="task-title-error" class="error-message"></span>
    </div>
    <div class="form-item">
    <label for="task-description">Description</label>
    <textarea id="task-description"></textarea>
    </div>
    <div class="form-item">
    <label for="task-date">Due Date</label>
    <input type="date" id="task-date" min="${getTodayDate()}">
    </div>
    </div>
    <div class="modal-footer">
    <button type="button" id="close-create-modal">Cancel</button>
    <button type="submit" class="btn-primary">Create Task</button>
    </div>
    </form>
    `;
    
    // Add form at the top of content-container
    contentContainer.appendChild(createTaskFormContainer);
    
    document.getElementById("close-create-form").addEventListener("click", closeModal);
    document.getElementById("close-create-modal").addEventListener("click", closeModal);
    document.getElementById("create-task-form").addEventListener("submit", createTask);
     
     
    }

 // Close forms & details modals 
 function closeModal() {
    // Check and remove the create task form if it exists
    if (createTaskFormContainer) {
        createTaskFormContainer.classList.remove("show");
        createTaskFormContainer.remove(); 
        createTaskFormContainer = null; 
    }

    if (editTaskFormContainer) {
        editTaskFormContainer.classList.remove("show");
        editTaskFormContainer.remove(); 
        editTaskFormContainer = null; 
    }
    if(taskDetailsContainer) {
       taskDetailsContainer.classList.remove("show");
       taskDetailsContainer.remove();
       taskDetailsContainer = null;
    }
    if(confirmationModal) {
       confirmationModal.classList.remove("show");
       confirmationModal.remove();
       confirmationModal = null;
    }
}

// Save task to localStorage
function createTask(event) {
    event.preventDefault(); 
    console.log(event);

    const title = document.getElementById("task-title").value;
    const dueDate = document.getElementById("task-date").value;
    const description = document.getElementById("task-description").value;

    if (!title) {
        showToast("Please fill in all required fields.", "warning", 4000);
        markField("task-title");
        return;
    }

    // Retrieve existing tasks or initialize empty array
    // Use JSON.parse to convert string to array
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Create new task object
    const task = {
        id: Date.now(), // timestamp used as id
        title,
        dueDate,
        description,
        status: "to-do" // Default status
    };

    // Add task to the end of array and save to localStorage
    tasks.push(task);

    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showToast("Task added successfully!", "success", 4000); // Feedback to user
        closeModal();
        
        // Immediately update the task list
        loadTasks(); 
    } catch (error) {
        showToast("Failed to save task. Please try again.", "danger", 4000);
    }

}

// Retrieve task list from localStorage
function loadTasks() {
    const taskList = document.getElementById("tasks-container");
    taskList.innerHTML = ``;
    
    let tasks = [];
    
    // Retrieve the list from localStorage
    try {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
        showToast("Failed to load tasks. Resetting task list.", "danger", 4000);
        localStorage.removeItem("tasks");
        tasks = [];
    }
    
    if (tasks.length === 0) {
        taskList.innerHTML = `<p id="no-tasks-message" class="empty-message">No tasks yet! Create a task to get started.</p>`;
        taskList.removeAttribute("role"); // Remove role="list" if no tasks exists
        return;
    }
    
    taskList.setAttribute("role", "list"); // Add role="list" if there are items
    
    tasks.forEach((task, index) => {
        const newDate = formatDate(task.dueDate);
        const isOverdue = task.dueDate && task.dueDate < today;
        const taskTitleId = `task-title-${index}`;
        const taskElement = document.createElement("div");
        
        taskElement.classList.add("task-card");
        taskElement.setAttribute("role", "listitem");
        taskElement.setAttribute("id", `task-${task.id}`);
        taskElement.setAttribute("aria-labelledby", taskTitleId);
        
        if (isOverdue) {
            taskElement.classList.add("overdue");
        }
        
        const statusClass = getStatusClass(task.status);
        
        taskElement.innerHTML = `
            <div class="status-box">
              <span class="task-status ${statusClass}">
              ${task.status || "N/A"}
              </span>
            </div>
            ${task.dueDate ? 
             `<div class="task-due-date date-box">
                 <i class="fa-regular fa-calendar"></i>
                 <span class="task-due-date-text">${newDate}</span>
              </div>`:
              `<div class="date-box"></div>`
            }
            <div class="title-box">
              <span class="task-title" id="${taskTitleId}">${task.title}</span>
              ${task.description ? `<span class="task-description-icon"><i class="fa-solid fa-align-left"></i>
                </span>` : ''}
            </div>
            <div class="edit-box">
              <button class="edit-task" title="Edit Task" data-id="${task.id}" aria-label="Edit ${task.title}"><i class="fa-solid fa-pen"></i></button>
            </div>
            <div class="delete-box">
              <button class="delete-task" title="Delete Task" data-id="${task.id}" aria-label="Delete ${task.title}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        
        taskList.appendChild(taskElement);
        
        taskElement.addEventListener("click", function (event) {
            if (!event.target.closest(".edit-task") && !event.target.closest(".delete-task")) {
                showTaskDetails(task);
            }
        });
    });

    // No need for `aria-owns`
    
    // Add event listeners for edit buttons
    document.querySelectorAll(".edit-task").forEach(button => {
        button.addEventListener("click", function () {
            showEditTaskForm(this.dataset.id);
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-task").forEach(button => {
        button.addEventListener("click", function () {
            confirmDelete("delete", "Delete confirmation", "Are you sure you want to delete this task?", this.dataset.id);
        });
    });
}


// Retrieve details of specific task from localStorage
function showTaskDetails(task){

    const statusClass = getStatusClass(task.status);

    // Create modal container
    taskDetailsContainer = document.createElement("div");
    taskDetailsContainer.id = "task-details-container";
    taskDetailsContainer.classList.add("details-modal");
    taskDetailsContainer.classList.add("show");
    taskDetailsContainer.innerHTML = `
        <div id="details-modal-content">
            <button id="close-details-modal">&times;</button>
            <div>
            <span class="task-status ${statusClass}">${task.status}</span>
            </div>
            <h2>${task.title}</h2>           
               ${task.description ? `<div><p><strong>Description</strong></p><p>${task.description}</p></div>`: ""}
               ${task.dueDate ? `<div><p><strong>Due Date</strong></p> <p>${formatDate(task.dueDate)}</p></div>` : ""}    
        </div>
    `;

    contentContainer.appendChild(taskDetailsContainer);

    document.getElementById("close-details-modal").addEventListener("click", closeModal);

}

// Delete task from localStorage
function deleteTask(taskId) {

    try {
    // retrieve stored tasks, if there is no tasks default to empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // create new array filtering out the task with given taskId
    tasks = tasks.filter(task => task.id != taskId);
    // save updated task lists to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Feedback to user
    showToast("Task deleted successfully!", "success", 4000)
    // Refresh task list on page
    loadTasks();  } catch(error) {
        showToast("Failed to delete task. Please try again.", "danger", 4000);
    }
}

// Remove task from localStorage and replace it with modified version
function editTask(event) {

    event.preventDefault();

    const taskId = event.target.dataset.id;
    const title = document.getElementById("new-task-title").value;
    const dueDate = document.getElementById("new-task-date").value;
    const status = document.getElementById("new-status").value;
    const description = document.getElementById("new-task-description").value;
   
    if (!title) {
        showToast("Please fill in all required fields.", "warning", 4000);
        markField("new-task-title");
        return;
    }
    try {
    // retrieve stored tasks
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
    // Find the index of the task to edit
    const taskIndex = tasks.findIndex(task => task.id === Number(taskId));
    
    // Update the task object
    tasks[taskIndex].title = title;
    tasks[taskIndex].dueDate = dueDate;
    tasks[taskIndex].status = status;
    tasks[taskIndex].description = description;
    
    // Save updated tasks array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    showToast("Task edited successfully!", "success", 4000); // Feedback to user
    closeModal();
    
    // Refresh task list on page
    loadTasks();  }catch(error){
    showToast("Failed to edit task. Please try again.", "danger", 4000); 

    }

}

// Preloads task information into form for manipulation
function showEditTaskForm(taskId){

    // retrieve stored tasks
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
    // create new array filtering only the task with given taskId
    let currentTask = tasks.filter(task => task.id === Number(taskId));
    

    // define possible status
    const statusOptions = ["to-do", "in progress", "done"];

    const statusSelectOptions = statusOptions.map(status => `
        <option value="${status}" ${currentTask[0].status === status ? "selected" : ""}>${status}</option>
    `).join("");

    
    // Allow past dates if the task is overdue, otherwise set min date to today
    const isOverdue = currentTask[0].dueDate && currentTask[0].dueDate < today;
    const minDate = isOverdue ? `min=${currentTask[0].dueDate}` : `min="${today}"`;

    // Create a form container div
    editTaskFormContainer = document.createElement("div");
    editTaskFormContainer.id = "edit-task-form-container";
    editTaskFormContainer.classList.add("show");
    editTaskFormContainer.innerHTML = `
        <form id="edit-task-form" data-id="${taskId}">
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
                    <input type="text" id="new-task-title" placeholder="Task Title" value="${currentTask[0].title}">
                    <span id="task-title-error" class="error-message"></span>
                </div>
                <div class="form-item">
                    <label for="new-task-description">Description</label>
                    <textarea id="new-task-description">${currentTask[0].description ? currentTask[0].description : ""}</textarea>
                </div>
                <div class="form-item">
                    <label for="new-task-date">Due Date</label>
                    <input type="date" id="new-task-date" value="${currentTask[0].dueDate}" ${minDate}>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="close-edit-modal">Discard Changes</button>
                <button type="submit" class="btn-primary">Save Changes</button>
            </div>
        </form>
    `;
     // Add form at the top of content-container
     contentContainer.appendChild(editTaskFormContainer);

     document.getElementById("close-edit-form").addEventListener("click", closeModal);
     document.getElementById("close-edit-modal").addEventListener("click", closeModal);
     document.getElementById("edit-task-form").addEventListener("submit", editTask);
}

// Alert 
function confirmDelete(action, title, message, taskId) {
    // if (window.confirm("Are you sure you want to delete this task?")) {
    //     deleteTask(taskId);
    // }

    confirmationModal = document.createElement('div');
    confirmationModal.id = `${action}-confirmation-modal`;
    confirmationModal.classList.add("confirmation-modal");
    confirmationModal.classList.add("show");
    confirmationModal.innerHTML = `
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
    </div>`
    console.log(confirmationModal);
    contentContainer.appendChild(confirmationModal);


    // Close modal if "Cancel" is clicked
    document.getElementById("cancel-delete").addEventListener("click", closeModal);
    document.getElementById("close-confirm-modal").addEventListener("click", closeModal);

    // Confirm delete when "Yes" is clicked
    document.getElementById("confirm-delete").addEventListener("click", () => {
    if (taskId !== null) {
        deleteTask(taskId);
        closeModal();
        taskId = null; // Reset
    }
    });


}


// Add class to required field for highligth
function markField(fieldId){

    let field = document.getElementById(fieldId);
    let message = document.getElementById(`${fieldId}-error`)

    field.classList.add("error-border");
    message.innerHTML = "Required field";

    // Remove error class when user starts typing
   field.addEventListener("input", () => {
        field.classList.remove("error-border");
        document.getElementById(`${fieldId}-error`).textContent = "";
    }, { once: true }); 
}

// Toast icons
let toastIcon = {
    success:
    '<i class="fa-solid fa-check"></i>',
    danger:
    '<i class="fa-solid fa-xmark"></i>',
    info:
    '<i class="fa-solid fa-info"></i>',
    warning:
    '<i class="fa-solid fa-triangle-exclamation"></i>'
};

// Toast Elements
let success = 
    document.querySelector(".custom-toast.success-toast");
let information = 
    document.querySelector(".custom-toast.info-toast");
let failed = 
    document.querySelector(".custom-toast.danger-toast");
let warn = 
    document.querySelector(".custom-toast.warning-toast");

// Display Toast notification according to context given in parameters
function showToast(message, toastType, duration) {
    // Code from: https://www.geeksforgeeks.org/how-to-make-a-toast-notification-in-html-css-and-javascript/

    // Create toaster element
    let toastContainer = document.createElement('div');
    toastContainer.classList.add(
        "toast", `toast-${toastType}`);
    toastContainer.innerHTML = ` <div class="toast-content-wrapper">
    <div class="toast-icon">
    ${toastIcon[toastType]}
    </div>
    <div class="toast-message">${message}</div>
    <div class="toast-progress"></div>
    </div>`;
    
    // Fallback for animation duration
    duration = duration || 5000;
    // Convert animation duration to seconds 
    toastContainer.querySelector(".toast-progress").style.animationDuration =
        `${duration / 1000}s`;


    // Remove existing toast
    let toastAlready = 
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(toastContainer)

}


// Utility functions

function getStatusClass(status){
   
    switch (status.toLowerCase()) {
        case "to-do":
            return "status-todo";
        case "in progress":
            return "status-in-progress";
        case "done":
            return "status-done";
        default:
            return "status-unknown"; 
    }

}

function formatDate(dateString) {
const date = new Date(dateString);
const options = { month: 'short', day: 'numeric' };
return date.toLocaleDateString('en-US', options);
}

function getTodayDate() {
return new Date().toISOString().split('T')[0];
}