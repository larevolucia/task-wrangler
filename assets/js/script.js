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
});

