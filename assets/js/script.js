const createTaskButton = document.getElementById("create-task");
const contentContainer = document.getElementById("content-container");

let formContainer; // store formContainer globally

document.addEventListener("DOMContentLoaded", () => {
    // Wrapping on DOMContentLoaded to Ensure that elements exists before manipulation
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
    // https://csswizardry.com/2023/07/in-defence-of-domcontentloaded

    // Show Progress Bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "25%";

    // Add event listener to the create-task button
    createTaskButton.addEventListener("click", showTaskForm);
    loadTasks();
});


function showTaskForm () {
   
    //  Check if form already exists
     if (formContainer) {
        formContainer.classList.toggle("show"); 
        return;
    }

     // Create a form container div
     formContainer = document.createElement("div");
     formContainer.id = "task-form-container";
     formContainer.classList.add("show");
     formContainer.innerHTML = `
         <form id="task-form">
             <button type="button" id="close-form">&times;</button>
             <h2>Add Task</h2>
             <input type="text" id="task-title" placeholder="Task Title" required>
             <input type="date" id="task-date">
             <div id="form-buttons">
             <button type="submit" class="btn-primary">Add Task</button>
             <button type="button" id="close-modal" class="btn-secondary">Cancel</button>
             </div>
         </form>
     `;

     // Add form at the top of content-container
     contentContainer.appendChild(formContainer);

     document.getElementById("close-form").addEventListener("click", closeModal);
     document.getElementById("close-modal").addEventListener("click", closeModal);
     document.getElementById("task-form").addEventListener("submit", saveTask);
     
     
    }

 // Close modal function 
 function closeModal() {
    formContainer.classList.remove("show");
}

// Save task
function saveTask(event) {
    event.preventDefault(); 
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
        id: Date.now(),
        title,
        dueDate,
        status: "to-do" // Default status
    };

    // Save to localStorage
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task added successfully!"); // Feedback to user
    closeModal();
    document.getElementById("task-form").reset();

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
        editTask(this.dataset.id);
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


function editTask(taskId) {
    
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}