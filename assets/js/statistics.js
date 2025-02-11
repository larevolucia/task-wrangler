// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

document.addEventListener("DOMContentLoaded", () => {
    getTasksStatistics();
  });


 function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }  

//Statistics
// https://stackoverflow.com/questions/45547504/counting-occurrences-of-particular-property-value-in-array-of-objects
function getTasksStatistics() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // const totalTasks = tasks.length;

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
        ["Task Status", "Count"],
        ["To-Do", todoTasks],
        ["In Progress", progressTasks],
        ["Done", doneTasks],
    ]

    console.log(taskList); 
}