// Wrapping on DOMContentLoaded to Ensure that elements exists before manipulation
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// https://csswizardry.com/2023/07/in-defence-of-domcontentloaded
document.addEventListener("DOMContentLoaded", () => {
    // Show Progress Bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "25%";
    // Show Task List
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = `<div class="task-card">
      <div class="task-header">
        <div class="task-info">
          <span class="task-status to-do">To Do</span>
          <span class="task-title">Some Title</span>
        </div>
        <span class="task-due-date">
          <i class="fa-regular fa-calendar"></i>
          <span class="task-due-date-text">Feb 2</span>
        </span>
        <div class="task-options"><i class="fa-solid fa-ellipsis-vertical"></i></div>
      </div>
    </div>`

    const createTaskButton = document.getElementById("create-task");
    const contentContainer = document.getElementById("content-container");

    function showTaskForm () {
   
    //  Check if form already exists
     if (document.getElementById("task-form-container")) return;

     // Create a form container div
     const formContainer = document.createElement("div");
     formContainer.id = "task-form-container";
     
     formContainer.innerHTML = `
         <form id="task-form">
             <input type="text" id="task-title" placeholder="Task Title" required>
             <input type="date" id="task-date">
             <div id="form-buttons">
             <button type="submit" class="btn-primary">Add Task</button>
             <button type="button" id="close-form" class="btn-secondary">Cancel</button>
             </div>
         </form>
     `;

     // Add form at the top of content-container
     contentContainer.appendChild(formContainer);

     // Add event listener for closing the form
     document.getElementById("close-form").addEventListener("click", function () {
         formContainer.remove();
     });
 }

 // Add event listener to the create-task button
 createTaskButton.addEventListener("click", showTaskForm);
});
