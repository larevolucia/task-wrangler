/* jshint esversion: 6 */
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

function createEscapeKeyHandler(callback) {
    return function (event) {
      if (event.key === "Escape") {
        callback(event);
      }
    };
  }
  

/* ACCESSIBILITY */

// Trap keyboard focus to modal
// https://zachpatrick.com/blog/how-to-trap-focus-inside-modal-to-make-it-ada-compliant
// https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
function trapFocus(event, modalId) {
    const isTabPressed = event.key === `Tab` || event.keyCode === 9;
  
    if (!isTabPressed) {
      return;
    }
  
    const modal = document.getElementById(modalId);
    if (!modal) return;
  
    const focusableEls = modal.querySelectorAll(
      'button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    if (focusableEls.length === 0) return; // Stop function if no focusable element is present
  
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
  
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      event.preventDefault();
    }
  }

export { getTasksFromStorage, formatDate, getTodayDate, getStatusClass, addEventListeners, trapFocus, createEscapeKeyHandler };