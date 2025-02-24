/* UTILITY FUNCTIONS */

function getTasksFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    localStorage.removeItem("tasks"); // reset tasks in case of corrupted data
    return [];
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getStatusClass(status) {
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

function addEventListeners(ids, event, handler) {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.addEventListener(event, handler);
  });
}

export { getTasksFromStorage, formatDate, getTodayDate, getStatusClass, addEventListeners };