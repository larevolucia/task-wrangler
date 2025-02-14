/* jshint esversion: 6 */
/*  TaskWrangler is a simple and motivational To-Do app built using HTML, CSS, and JavaScript. 
    insights.js connects with Google Charts API to display task progress insights   */

// Load the Visualization API and the corechart package
google.charts.load("current", { packages: ["corechart"] });

document.addEventListener("DOMContentLoaded", () => {
  // Once the API loads, check for tasks and display charts or an empty state message
  google.charts.setOnLoadCallback(drawCharts);
});

// Trigger specific functions to draw charts if data is available or displays empty state message
function drawCharts() {
 const tasks = JSON.parse(localStorage.getItem("tasks"));
 let emptyStateMessage = document.getElementById("empty-state-insights");

 if(!tasks || tasks.length === 0) {

    if (!emptyStateMessage) {
    let section = document.getElementById("insights-content-area");
    let emptyState = document.createElement("div");
    emptyState.id = "empty-state-insights";
    emptyState.innerHTML = `<p id="no-tasks-message" class="empty-message">No tasks yet! <a href="index.html#create-task">Create a task</a> to see insights.</p>`;

    section.appendChild(emptyState);}
    return
 } else {

    if (emptyStateMessage) {
        emptyStateMessage.remove();
    }

     drawOverdueChart();
     drawStatusChart();
 }
    
}

// Redraw charts when the window is resized to ensure responsiveness
window.addEventListener("resize", () => {
  drawCharts();
});

// Draw pie chart with tasks by their statuses
function drawStatusChart() {
  let taskList = getTasksByStatus();

  // Create the data table
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Status");
  data.addColumn("number", "Tasks");
  data.addRows(taskList);

  // Configure the pie chart to display task counts by status
  const options = {
    title: "Tasks by Status",
    titleTextStyle: { fontSize: 16, bold: true },
    legend: { position: "bottom" },
    width: "100%",
    height: 300,
    colors: ["#FFC107", "#1565C0", "#4CAF50"],
  };
  
  // Instantiate and draw our chart, passing in some options
  const chart = new google.visualization.PieChart(
    document.getElementById("chart-status")
  );
  chart.draw(data, options);
}

// Draw pie chart with overdue vs on time tasks
function drawOverdueChart() {
  let taskList = getOverdueTasks();
  
  // Create the data table.
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Overdue");
  data.addColumn("number", "Tasks");
  data.addRows(taskList);
  
  // Configure the pie chart to display Overdue tasks
  const options = {
    title: "Overdue Tasks",
    titleTextStyle: { fontSize: 16, bold: true },
    width: "100%",
    height: 300,
    colors: ["#4CAF50","#D32F2F"],
    legend: { position: "bottom" },
    
  };
  
  // Instantiate and draw our chart, passing in some options
  const chart = new google.visualization.PieChart(
    document.getElementById("chart-overdue")
  );
  chart.draw(data, options);
}

// Get the count of tasks for each status category (to-do, in-progress, done)
// Uses `.reduce()` to accumulate counts for each status type
// Reference: https://stackoverflow.com/questions/45547504/counting-occurrences-of-particular-property-value-in-array-of-objects
function getTasksByStatus() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const todoTasks = tasks.reduce((acc, task) => {
    return task.status === "to-do" ? ++acc : acc;
  }, 0);

  const progressTasks = tasks.reduce((acc, task) => {
    return task.status === "in progress" ? ++acc : acc;
  }, 0);

  const doneTasks = tasks.reduce((acc, task) => {
    return task.status === "done" ? ++acc : acc;
  }, 0);

  const taskList = [
    ["To-Do", todoTasks],
    ["In Progress", progressTasks],
    ["Done", doneTasks],
  ];

  return taskList;
}

// Categorize tasks based on due date
// - "Overdue" = Tasks with a past due date and not marked as "done"
// - "On Time" = Tasks with future due dates or no due date at all (assumed to be flexible)
function getOverdueTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const today = new Date().toISOString().split("T")[0];

  let overdueTasks = 0;
  let notOverdueTasks = 0;

  tasks.forEach((task) => {
    if (task.dueDate) {
      if (task.dueDate < today && task.status !== "done") {
        overdueTasks++;
      } else {
        notOverdueTasks++;
      }
    } else {
      notOverdueTasks++; 
    }
  });

  return [
    ["On Time", notOverdueTasks],
    ["Overdue", overdueTasks],
  ];
}
