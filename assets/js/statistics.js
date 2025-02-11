// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawStatusChart);
google.charts.setOnLoadCallback(drawOverdueChart);

document.addEventListener("DOMContentLoaded", () => {
  });


 function drawStatusChart() {
        let taskList = getTasksByStatus();

        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Status');
        data.addColumn('number', 'Tasks');
        data.addRows(taskList);

        // Set chart options
        const options = {'title':'Tasks by Status',
                       'width':400,
                       'height':300,
                       'colors': ["#FFC107", "#1565C0", "#4CAF50"]};

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.PieChart(document.getElementById('chart_status'));
        chart.draw(data, options);
      } 

 function drawOverdueChart() {
        let taskList = getOverdueTasks();

        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Overdued');
        data.addColumn('number', 'Tasks');
        data.addRows(taskList);

        // Set chart options
        const options = {'title':'Overdued Tasks',
                       'width':400,
                       'height':300,
                       'colors': ["#D32F2F", "#4CAF50"]};

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.PieChart(document.getElementById('chart_overdue'));
        chart.draw(data, options);
      }  

//Statistics
// https://stackoverflow.com/questions/45547504/counting-occurrences-of-particular-property-value-in-array-of-objects
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
    ]
    
    return taskList;
}

function getOverdueTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date().toISOString().split("T")[0]; 

    let overdueTasks = 0;
    let notOverdueTasks = 0;

    tasks.forEach((task) => {
        if (task.dueDate) {
            if (task.dueDate < today && task.status !== "done") {
                overdueTasks++; // Task is overdue
            } else {
                notOverdueTasks++; 
            }
        } else {
            notOverdueTasks++; // Tasks without a due date are considered not overdue
        }
    });

    return [
        ["Overdue", overdueTasks],
        ["Not Overdue", notOverdueTasks],
    ];
}
