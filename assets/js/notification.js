/* NOTIFICATION */

// Toast icons
let toastIcon = {
    success: '<i class="fa-solid fa-check"></i>',
    danger: '<i class="fa-solid fa-xmark"></i>',
    info: '<i class="fa-solid fa-info"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation"></i>',
  };
  
  // Display Toast notification according to context given in parameters
  function showToast(message, toastType, duration = 5000, lastFocusedEl = null, fallbackFocusEl = null) {
    // Remove any existing toast
    let existingToast = document.body.querySelector(".toast");
    if (existingToast) {
      existingToast.remove();
    }
    
    const toastContainer = createToastContainer(message, toastType);
    
    // Set the animation duration for the progress bar
    toastContainer.querySelector(".toast-progress").style.animationDuration = `${duration / 1000}s`;
    
    // Append and focus the toast
    document.body.appendChild(toastContainer);
    toastContainer.focus();
    
    // Close the toast on button click
    toastContainer.querySelector("#toast-close-icon").addEventListener("click", () => {
      closeToast(toastContainer, lastFocusedEl, fallbackFocusEl);
    });
    
    // Close the toast on Escape key press
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeToast(toastContainer, lastFocusedEl, fallbackFocusEl);
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);
    
    // Automatically close the toast after the duration expires
    setTimeout(() => closeToast(toastContainer, lastFocusedEl, fallbackFocusEl), duration);
  }
  
  // Fucntion to create toast container
  function createToastContainer(message, toastType){
    
    let container = document.createElement("div");
    container.setAttribute("tabindex", "0");
    container.setAttribute("role", "alert");
    container.setAttribute("aria-live", "polite");
    container.classList.add("toast", `toast-${toastType}`);
    container.innerHTML = `
    <div class="toast-content-wrapper">
    <div class="toast-icon">${toastIcon[toastType]}</div>
    <div class="toast-message">${message}</div>
    <button class="toast-close" id="toast-close-icon" aria-label="Close Notification">&times;</button>
    <div class="toast-progress"></div>
      </div>`;
      
      return container;
    }
  
    // Function to close the toast and restore focus
  function closeToast(toastContainer, lastFocusedEl, fallbackFocusEl) {
      if (toastContainer && document.body.contains(toastContainer)) {
        toastContainer.remove();
      }
       // If the create task form is still open, do nothing 
      if (document.getElementById("create-task-form-container") || document.getElementById("edit-task-form-container")) {
        return;
      }

      // Check if the currently focused element is acceptable.
      if (!document.activeElement || document.activeElement === document.body){
          // Restore focus to the element that was focused before the toast appeared
          if (lastFocusedEl && document.contains(lastFocusedEl)) {
            lastFocusedEl.focus();
        } else {
            fallbackFocusEl.focus(); // Fallback focus if previous element is gone
        }
      }      
  }

  export { showToast };