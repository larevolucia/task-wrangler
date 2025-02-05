const createTaskButton = document.getElementById("create-task");
const contentContainer = document.getElementById("content-container");

// store formContainer globally
let createTaskFormContainer;
let editTaskFormContainer; 
let taskDetailsContainer; 

// get today date for overdue task styling
const today = getTodayDate();

document.addEventListener("DOMContentLoaded", () => {
    // Wrapping on DOMContentLoaded to Ensure that elements exists before manipulation
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
    // https://csswizardry.com/2023/07/in-defence-of-domcontentloaded

    
    // Add event listener to the create-task button
    createTaskButton.addEventListener("click", showCreateTaskForm);
    console.log("DOM loaded")
    showProgressBar();
    loadTasks();
});
function showProgressBar(){
    // Show Progress Bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "25%";


}

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
             <button type="button" id="close-create-form">&times;</button>
             <h2>Add Task</h2>
             <div>
             <label for="task-title">Title<small>*</small></label>
             <input type="text" id="task-title">
             <span id="task-title-error" class="error-message"></span>
             </div>
             <div>
             <label for="task-description">Description</label>
             <textarea id="task-description"></textarea>
             </div>
             <div>
             <label for="task-date">Due Date</label>
             <input type="date" id="task-date" min="${getTodayDate()}">
             </div>
             <div class="form-buttons">
             <button type="submit" class="btn-primary">Add Task</button>
             <button type="button" id="close-create-modal" class="btn-secondary">Cancel</button>
             </div>
         </form>
     `;

     // Add form at the top of content-container
     contentContainer.appendChild(createTaskFormContainer);

     document.getElementById("close-create-form").addEventListener("click", closeModal);
     document.getElementById("close-create-modal").addEventListener("click", closeModal);
     document.getElementById("create-task-form").addEventListener("submit", saveTask);
     
     
    }

 // Close modal function 
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
}


// Save task
function saveTask(event) {
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
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showToast("Task added successfully!", "success", 4000); // Feedback to user
    closeModal();

     // Immediately update the task list
    loadTasks(); 
}


// Show Task List function
function loadTasks(){
    console.log("List refresh")
const taskList = document.getElementById("tasks-container");
taskList.innerHTML = ``;

//retrieve the list from localStorage

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {

const newDate = formatDate(task.dueDate);
const isOverdue = task.dueDate && task.dueDate < today;

const taskElement = document.createElement("div");
taskElement.classList.add("task-card");

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
          <span class="task-title">${task.title}</span>
          ${task.description ? `<span class="task-description-icon"><i class="fa-solid fa-align-left"></i>
            </span>` : ''}
        </div>
        <div class="edit-box">
          <button class="edit-task" data-id="${task.id}"><i class="fa-solid fa-pen"></i></button>
        </div>
        <div class="delete-box">
          <button class="delete-task" data-id="${task.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      
   `;

 taskList.appendChild(taskElement);

 // Add event listeners for task details
  taskElement.addEventListener("click", function (event) {
   
         if(!event.target.closest(".edit-task") && !event.target.closest(".delete-task")){showTaskDetails(task);}
 
 });
}
);
// Add event listeners for edit buttons
document.querySelectorAll(".edit-task").forEach(button => {
    button.addEventListener("click", function () {
        showEditTaskForm(this.dataset.id);
    });
});

 // Add event listeners for delete buttons
 document.querySelectorAll(".delete-task").forEach(button => {
    button.addEventListener("click", function () {
        deleteTask(this.dataset.id);
    });
});


}

function showTaskDetails(task){

    // Create modal container
    taskDetailsContainer = document.createElement("div");
    taskDetailsContainer.id = "task-details-container";
    taskDetailsContainer.classList.add("details-modal");
    taskDetailsContainer.classList.add("show");
    taskDetailsContainer.innerHTML = `
        <div id="details-modal-content">
            <button id="close-details-modal">&times;</button>
            <h2>${task.title}</h2>
            <p><span class="task-status">${task.status}</span></p>
            ${task.dueDate ? `<p><strong>Due Date:</strong> ${formatDate(task.dueDate)}</p>` : ""}
            <p><strong>Description:</strong></p>
            <p>${task.description ? task.description : "No description available."}</p>
        </div>
    `;

    contentContainer.appendChild(taskDetailsContainer);

    document.getElementById("close-details-modal").addEventListener("click", closeModal);

}

function deleteTask(taskId) {
    // retrieve stored tasks, if there is no tasks default to empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // create new array filtering out the task with given taskId
    tasks = tasks.filter(task => task.id != taskId);
    // save updated task lists to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Feedback to user
    showToast("Task deleted successfully!", "success", 4000)
    // Refresh task list on page
    loadTasks();  
}


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
    loadTasks();  

}


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
            <button type="button" id="close-edit-form">&times;</button>
            <h2>Edit Task</h2>
            <div>
               <label for="new-status">Status</label>
               <select id="new-status" name="status">
                ${statusSelectOptions}
               </select>
            </div>
             <div>
               <label for="new-task-title">Title<small>*</small></label>
               <input type="text" id="new-task-title" placeholder="Task Title" value="${currentTask[0].title}">
               <span id="task-title-error" class="error-message"></span>
            </div>
            <div>
                <label for="new-task-description">Description</label>
                <textarea id="new-task-description">${currentTask[0].description ? currentTask[0].description : ""}</textarea>
            </div>
            <div>
               <label for="new-task-date">Due Date</label>
               <input type="date" id="new-task-date" value="${currentTask[0].dueDate}" ${minDate}>
            </div>

            <div id="form-buttons">
            <button type="submit" class="btn-primary">Save Task</button>
            <button type="button" id="close-edit-modal" class="btn-secondary">Cancel</button>
            </div>
        </form>
    `;
     // Add form at the top of content-container
     contentContainer.appendChild(editTaskFormContainer);

     document.getElementById("close-edit-form").addEventListener("click", closeModal);
     document.getElementById("close-edit-modal").addEventListener("click", closeModal);
     document.getElementById("edit-task-form").addEventListener("submit", editTask);
}



// utility functions

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

// Create a Toast notification
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