const createTaskButton = document.getElementById("create-task");
const contentContainer = document.getElementById("content-container");

// store formContainer globally
let createTaskFormContainer;
let editTaskFormContainer; 

document.addEventListener("DOMContentLoaded", () => {
    // Wrapping on DOMContentLoaded to Ensure that elements exists before manipulation
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
    // https://csswizardry.com/2023/07/in-defence-of-domcontentloaded

    // Show Progress Bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "25%";

    // Add event listener to the create-task button
    createTaskButton.addEventListener("click", showCreateTaskForm);
    loadTasks();
});


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
             <input type="text" id="task-title" placeholder="Task Title" required>
             <input type="date" id="task-date">
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
    if (createTaskFormContainer) {
        createTaskFormContainer.classList.remove("show");
    }
    
    if (editTaskFormContainer) {
        editTaskFormContainer.classList.remove("show");
    }
}


// Save task
function saveTask(event) {
    event.preventDefault(); 
    console.log(event);
    const title = document.getElementById("task-title").value;
    const dueDate = document.getElementById("task-date").value;

    if (!title) {
        alert("Please fill in all required fields.");
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
        status: "to-do" // Default status
    };

    // Add task to the end of array and save to localStorage
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task added successfully!"); // Feedback to user
    closeModal();
    document.getElementById("create-task-form").reset();

     // Immediately update the task list
    loadTasks(); 
}


// Show Task List function
function loadTasks(){
const taskList = document.getElementById("tasks-container");
taskList.innerHTML = ``;

//retrieve the list from localStorage

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
const newDate = formatDate(task.dueDate);
const taskElement = document.createElement("div");
taskElement.classList.add("task-card");
taskElement.innerHTML = `

  
        <div class="status-box">
          <span class="task-status">
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
        </div>
        <div class="edit-box">
          <button class="edit-task" data-id="${task.id}"><i class="fa-solid fa-pen"></i></button>
        </div>
        <div class="delete-box">
          <button class="delete-task" data-id="${task.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      
   `;

 taskList.appendChild(taskElement);

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

function deleteTask(taskId) {
    // retrieve stored tasks, if there is no tasks default to empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // create new array filtering out the task with given taskId
    tasks = tasks.filter(task => task.id != taskId);
    // save updated task lists to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Refresh task list on page
    loadTasks();  
}


function editTask(event) {

    event.preventDefault();

    const taskId = event.target.dataset.id;
    const title = document.getElementById("new-task-title").value;
    const dueDate = document.getElementById("new-task-date").value;
    const status = document.getElementById("new-status").value;

    // retrieve stored tasks
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
    // Find the index of the task to edit
    const taskIndex = tasks.findIndex(task => task.id === Number(taskId));
    
    // Update the task object
    tasks[taskIndex].title = title;
    tasks[taskIndex].dueDate = dueDate;
    tasks[taskIndex].status = status;
    
    // Save updated tasks array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    alert("Task edited successfully!"); // Feedback to user
    closeModal();
    document.getElementById("edit-task-form").reset();
    
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

    // Create a form container div
    editTaskFormContainer = document.createElement("div");
    editTaskFormContainer.id = "edit-task-form-container";
    editTaskFormContainer.classList.add("show");
    editTaskFormContainer.innerHTML = `
        <form id="edit-task-form" data-id="${taskId}">
            <button type="button" id="close-edit-form">&times;</button>
            <h2>Edit Task</h2>
            <input type="text" id="new-task-title" placeholder="Task Title" value="${currentTask[0].title}" required>
            <input type="date" id="new-task-date" value="${currentTask[0].dueDate}" >
            <select id="new-status" name="status">
                ${statusSelectOptions}
            </select>
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



function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}