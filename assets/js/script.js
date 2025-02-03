// Wrapping on DOMContentLoaded to Ensure that elements exists before manipulation
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// https://csswizardry.com/2023/07/in-defence-of-domcontentloaded
document.addEventListener("DOMContentLoaded", () => {
    // Show Progress Bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "25%";

    const createTaskButton = document.getElementById("create-task");
    const contentContainer = document.getElementById("content-container");

    let formContainer; // store formContainer

    function showTaskForm () {
   
    //  Check if form already exists
     if (formContainer) {
        formContainer.style.display = "flex"; // Show existing modal
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
    
    function closeModal() {
        formContainer.classList.remove("show");
        setTimeout(() => formContainer.remove(), 300); // Remove from DOM after fade out
    }

    // Close modal function 
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
            dueDate
        };

        // Save to localStorage
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        alert("Task added successfully!"); // Feedback to user
        closeModal();
        document.getElementById("task-form").reset();
    }


 // Add event listener to the create-task button
 createTaskButton.addEventListener("click", showTaskForm);
 loadTasks();
});

// Show Task List function
function loadTasks(){
const taskList = document.getElementById("tasks-container");
taskList.innerHTML = ``;

//retrieve the list from localStorage

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
const taskElement = document.createElement("div");
taskElement.classList.add("task-list");
taskElement.innerHTML = `
<div class="task-card">
      <div class="task-header">
        <div class="task-info">
          <span class="task-status to-do">To Do</span>
          <span class="task-title">${task.title}</span>
        </div>
        <span class="task-due-date">
          <i class="fa-regular fa-calendar"></i>
          <span class="task-due-date-text">${task.dueDate}</span>
        </span>
        <div class="task-options">
        <i class="fa-solid fa-ellipsis-vertical" data-id="${task.id}"></i>
        </div>
      </div>
    </div>`;

 taskList.appendChild(taskElement);

}

)
}


