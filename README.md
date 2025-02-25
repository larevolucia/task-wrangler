# TaskWrangler

## Table of Contents

- [Summary](#summary)
- [Site Goals](#-site-goals)
- [User Stories](#-user-stories)
  - [The Planner](#the-planner)
  - [The Juggler](#the-juggler)
  - [The Inspirer](#the-inspirer)
- [Backlog](#-backlog)
  - [Features Not Implemented](#features-not-implemented)
- [Design](#-design)
  - [Colors](#colors)
  - [Fonts](#fonts)
  - [Buttons](#buttons)
  - [Anchor](#anchor)
- [Wireframes](#wireframes)
- [Features](#-features)
  - [1. Navigation](#1-navigation)
  - [2. Create Tasks with Ease](#2-create-tasks-with-ease)
  - [3. Task Management (CRUD)](#3-task-management-crud)
    - [3.1 Task List View](#31-task-list-view)
    - [3.2 Read Task Details](#32-read-task-details)
    - [3.3 Edit Task Status](#33-edit-task-status)
    - [3.3 Edit Task](#34-edit-task)
    - [3.4 Delete Task](#35-delete-task)
  - [4. Smart Toast Notifications](#4-smart-toast-notifications)
  - [5. Advanced Keyboard Navigation](#5-advanced-keyboard-navigation)
  - [6. Insights & Analytics (Task Progress Charts)](#6-insights--analytics-task-progress-charts)
    - [6.1 Status Breakdown Chart](#61-status-breakdown-chart)
    - [6.2 Overdue Task Analysis](#62-overdue-task-analysis)
    - [6.3 Responsive Charts](#63-responsive-charts)
- [Additional Enhancements](#additional-enhancements)
- [Testing](#testing)
  - [Manual Testing](#manual-testing)
  - [Automated Testing](#automated-testing)
  - [Bugs & Issues](#bugs--issues)
- [Bug Fixes and Updates](#bug-fixes-and-updates)
  - [List of Fixed Issues](#list-of-fixed-issues)
  - [Unfixed issues](#unfixed-issues)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [Acknowledgments](#acknowledgments)

## Summary

Many people feel overwhelmed when managing their to-do lists, making it difficult to stay motivated. Traditional to-do apps often overcomplicate things with excessive features while neglecting simplicity and motivation. As a result, these apps can become cumbersome to use, causing users to lose focus on their goals and abandon task management altogether.

**TaskWrangler** goes back to basics and is designed to be a simple, beginner-friendly to-do app aimed at making task management intuitive and motivating.

The app enables users to:

- Organize tasks effectively by adding, editing, and deleting tasks.
- Organize tasks based on their status of completeness.
- Prioritize tasks by setting due dates and highlighting overdue items with visual cues.
- Track progress visually with insightful charts.

By focusing on simplicity, usability, and motivation, **TaskWrangler** empowers users to manage their tasks consistently without feeling overwhelmed.

<div align="center">
  <img width="600" alt="image" src="https://github.com/user-attachments/assets/58613200-62e2-4211-b074-20380e3f89b7" />
</div>


🔗 **Live Link to access site**: [TaskWrangler](https://larevolucia.github.io/task-wrangler/)

---

## 📌 Site Goals

### **Core Functionality**
- Allow users to create, edit, and delete tasks easily.
- Provide status updates (e.g., "To Do", "In Progress", "Completed") for better task management.
- Enable users to set and view due dates for their tasks.

### **Visualization and Tracking**
- Implement an **Insights** page with a chart to visualize overall task completion.
- Highlight overdue tasks with visual indicators.

### **User Experience**
- Design a clean and responsive UI for seamless navigation on all devices.
- Ensure **data persistence** so tasks remain saved after page refreshes.

### **Scalability**
- Make the app easy to expand in the future, with potential features like **task categories, prioritization, filtering, or user authentication**.

---

## 👤 User Stories

### **The Planner**
These users are naturally organized and detail-oriented. They use the app to maintain their structure and ensure nothing is overlooked.

#### **Needs:**
- A clean and straightforward interface for inputting tasks.
- Features like **status management/categorization and due dates** for precise task tracking.

#### **Behavior:**
- Frequently updates and organizes tasks.
- Likes visual indicators of progress for a quick overview of accomplishments.

#### **User Stories:**
- [As a user, I want to register my tasks so I can track what I need to do.](https://github.com/larevolucia/task-wrangler/issues/1)
- [As a user I want to see my list of tasks so I can have an overview of items to prioritize.](https://github.com/larevolucia/task-wrangler/issues/16)
- [As a user, I want to set the status of my tasks so I can track my progress.](https://github.com/larevolucia/task-wrangler/issues/9)
- [As a user, I want to be able to edit tasks so I can correct or update information.](https://github.com/larevolucia/task-wrangler/issues/11)
- [As a user, I want to delete tasks so I can remove tasks that are no longer relevant.](https://github.com/larevolucia/task-wrangler/issues/12)

### **The Juggler**
These users juggle multiple responsibilities at work and home. They need the app to streamline their tasks and reduce stress.

#### **Needs:**
- **Categorization** to separate work, personal, and other types of tasks.
- **Visual cues** for overdue or high-priority tasks.

#### **Behavior:**
- Adds many tasks but may only complete a few daily.
- Uses filters or categories to focus on specific areas.

#### **User Stories:**
- [As a user, I want to set a due date for my tasks so I can prioritize them.](https://github.com/larevolucia/task-wrangler/issues/10)
- [As a user, I want motivational quotes at specific milestones to help keep me motivated.](https://github.com/larevolucia/task-wrangler/issues/15) *(Not implemented – see backlog)*


### **The Inspirer**
These users are less focused on task management and more on personal growth and motivation. They find inspiration in milestones and uplifting content.

#### **Needs:**
- Regularly updated **motivational quotes** or messages.
- A visually appealing **progress bar or milestone tracker**.

#### **Behavior:**
- Logs in to see motivational content even when tasks are minimal.
- Values the app for its **inspiration** as much as its functionality.

#### **User Stories:**
- [As a user, I want a visual indicator of progress so I can see how many tasks I have completed.](https://github.com/larevolucia/task-wrangler/issues/14)
- [As a user, I want to categorize my tasks so I can organize them by type or priority.](https://github.com/larevolucia/task-wrangler/issues/13) *(Not implemented – see backlog)*

---

## 📂 Backlog

The following features were **originally planned** but were not implemented in this phase due to a shift in priorities. Instead, we focused on **enhancing the user experience** by introducing:
- **[Toast notifications](https://github.com/larevolucia/task-wrangler/issues/23)** for better feedback.
- **[Keyboard accessibility](https://github.com/larevolucia/task-wrangler/issues/17)** for improved usability.
- **[Update Status From Task List](https://github.com/larevolucia/task-wrangler/issues/39)** for improved usability.

### **Features Not Implemented:**

#### 1️⃣ **Motivational Quotes at Milestones** (The Juggler)  
- [As a user, I want motivational quotes at specific milestones to help keep me motivated.](https://github.com/larevolucia/task-wrangler/issues/15)  
_This feature was **deprioritized** in favor of **[toast notifications](https://github.com/larevolucia/task-wrangler/issues/23)**, which provide immediate feedback to users upon completing actions like adding or editing tasks._

#### 2️⃣ **Task Categorization** (The Inspirer)  
- [As a user, I want to categorize my tasks so I can organize them by type or priority.](https://github.com/larevolucia/task-wrangler/issues/13)  
 _Instead of implementing **categorization**, we focused on **[keyboard accessibility](https://github.com/larevolucia/task-wrangler/issues/17)**, making the app more inclusive and efficient for all users._


These features remain on the **backlog** for potential future development as **TaskWrangler** continues to evolve.

---

## 🎨 Design

### Colors

Considering the primary function of the app is managing tasks, it was decided to keep with simple color scheme.
Worldwide recognizable colors were selected for tracking progress: green, yellow, red.

For the base of the app, a neutral blue was chosen, since it is a calming color that doesn't clash with the traffic light scheme.
A white hex was selected for the background and a black hex was selected for the text color.

<details>
  <summary>Color Palette</summary>
<img width="783" alt="image" src="https://github.com/user-attachments/assets/85d434e3-954c-4238-9513-c8299b8b2aed">
</details>


### Fonts

For TaskWrangler, [Inter](https://fonts.google.com/specimen/Inter) was selected as the primary font, used for the body text and logo, and [Roboto](https://fonts.google.com/specimen/Roboto) as the secondary font for headings and toast notifications to optimize readability and maintain a clean, modern aesthetic.

### Why Inter for Body & Logo?
- Highly readable for long-form text, ensuring tasks and descriptions are easy to scan.
- Modern and neutral, fitting TaskWrangler’s minimalist design.
- Strong identity when used in the logo, reinforcing brand consistency.

### Why Roboto for Headings & Toast Notifications?
- Bold and structured, making H1 and H2 stand out for clear visual hierarchy.
- Slightly condensed design, optimizing space for notifications without reducing legibility.
- Pairs well with Inter, balancing a clean UI with strong contrast where needed.

### Buttons 

<details>
  <summary>Button States</summary>
  <img width="150" alt="image" src="https://github.com/user-attachments/assets/0ede6cb6-edf4-4e86-9393-ce34541963f2" />
</details>

### Anchor 

<details>
  <summary>Anchor States</summary>
  <img width="150" alt="image" src="https://github.com/user-attachments/assets/048a1c76-74c7-4e5b-a5c5-aae96ea3b96a" />
</details>


## Wireframes

<details>
  <summary>Mobile Design</summary>
  <img width="600" alt="image" src="https://github.com/user-attachments/assets/2cd56290-35a1-43f1-ae1d-dc1beb9d8a44" />
</details>

---
## 🚀 Features

### **1. Navigation**

Provides a clean and accessible navigation system for seamless interaction with the app. Users can easily create tasks, view task lists, and access insights.

- **Focus management:** Uses `document.activeElement` tracking to return focus to the last interacted element after closing modals.
- **Keyboard navigation:** Supports `Tab` key navigation across buttons, links, and modals.
- **ARIA attributes:** Ensures screen reader compatibility with `aria-labelledby`, `role="list"`, and `aria-live` for live updates.
- **Sticky Navigation:** The header remains fixed at the top using `position: sticky`, improving accessibility.

<div align="center">
  <img src="https://github.com/user-attachments/assets/3ffbeb3e-4750-4cf5-a939-889c8b031f02" alt="responsive-design">
</div>

**Reference:** [Hidde Blog](https://hidde.blog/using-javascript-to-trap-focus-in-an-element/), [Zach Patrick](https://zachpatrick.com/blog/how-to-trap-focus-inside-modal-to-make-it-ada-compliant) and [More](https://github.com/larevolucia/task-wrangler/issues/17)

### **2. Create Tasks with Ease**

Allows users to add new tasks with essential details such as **title, description, and due date**.

- **Modal Form Implementation:** Task creation is handled within a dynamically generated modal.
- **Form Validation:** 
  - Ensures **title is required** before submission.
  - Prevents **past due dates** using `min="${getTodayDate()}"`.
  - Displays **error messages** using JavaScript.
- **LocalStorage Integration:** 
  - Tasks are stored in `localStorage` and retrieved on page load.
- **Keyboard Shortcuts:**
  - `Enter` key submission for faster input.
  - `Escape` key to close the form.

<div align="center">
  <img src="https://github.com/user-attachments/assets/2b897b54-fcbc-4382-9e1d-03754247b5b2" alt="create-task">
</div>

**Reference:** [DEV.to](https://dev.to/adetutu/how-to-implement-a-custom-modal-with-css-ah1), [GeeksForGeeks](https://www.geeksforgeeks.org/how-to-create-a-modal-box-using-html-css-and-javascript/) and [More](https://github.com/larevolucia/task-wrangler/issues/1)

### **3. Task Management (CRUD)**

#### **3.1 Task List View**

Displays all tasks in **card format**, each showing **status, due date, and action buttons**.

- **Dynamic HTML Generation:** Tasks are rendered dynamically using `innerHTML` within `#tasks-container`.
- **Accessibility Features:** 
  - Uses `role="list"` and `role="listitem"` for semantic structuring.
  - `aria-labelledby` links task titles to their containers for screen readers.
- **Overdue Task Highlighting:**
  - If a task’s due date is past today’s date, the task is assigned an `overdue` class that applies a red color.

<div align="center">
<img width="307" alt="image" src="https://github.com/user-attachments/assets/3124ef7e-3e2e-44fd-9881-e99f7583443d" />
</div>


#### **3.2 Read Task Details**

- Clicking a task card opens a modal displaying **status, description, and due date**.
- Implemented using a dynamically created `div` inside `#content-container`.
- Read view also includes action buttons to minimize back and forth on the UI.
- Uses **`trapFocus()` function** to lock focus within the modal.

<div align="center">
<img width="290" alt="image" src="https://github.com/user-attachments/assets/2274d8a8-264a-4352-9659-c424d18ae14a" />
</div>

**Reference:** [Codepen](https://codepen.io/patrickhlauke/pen/vpQNgJ), [StackOverflow](https://stackoverflow.com/questions/70068954/make-entire-card-clickable-by-targeting-a-inside-of-it) and [More](https://github.com/larevolucia/task-wrangler/issues/16)

#### **3.3 Edit Task Status**

- Users can change a task’s status (**To-Do → In Progress → Done**) directly from the list view.
- **Dropdown Selection:** A simple **dropdown menu** is provided for easy status selection.
- **Auto-Save & UI Update:**  
  - Upon selection, the task status is **immediately updated in localStorage** and **reflected in the UI** without requiring a page reload.
- **Accessibility Support:**  
  - Fully navigable via keyboard (`Tab` and `Enter` keys).
- **Visual Feedback:**  
  - **Color-coded indicators** adjust automatically to reflect the new status.  
  - A **toast notification** confirms successful status updates.  

<div align="center">
  <img width="307" src="https://github.com/user-attachments/assets/910e5bc0-8d1d-416b-96e1-a46dc8da0d63" alt="change-status">
</div>

#### **3.4 Edit Task**

- Users can **update title, description, status, and due date**.
- **Previous values:** Pre-fills form with task current values for users' convenience.
- **Prevent Unnecessary updates:** Compares current and new values before updating `localStorage` and sends notification of use cases (edit success, no edits).
- **Prevent Overdue Edits:** 
  - If a task is overdue, past dates are still allowed for consistency. Earliest date is set to original due date using `min=${currentTask[0].dueDate}`.
- **Auto-save on Submit:** Updates **localStorage** and **UI** without page reload.

<div align="center">
<img width="307" alt="image" src="https://github.com/user-attachments/assets/91597b1c-dabd-4389-905d-1febb0fb1630" />
</div>

#### **3.5 Delete Task**

- **Confirmation Modal:** Before deletion, users receive a confirmation prompt.
- **Persistent Storage Update:** Task is removed from `localStorage`, and UI is updated dynamically.
- **Keyboard Navigation:** Supports `Enter` key selection and `Escape` key to cancel.

<div align="center">
  <img src="https://github.com/user-attachments/assets/73e4535b-65c1-4164-8d2e-8b3968ee2a2c" alt="delete-task">
</div>


### **4. Smart Toast Notifications**

Provides real-time feedback on task actions such as **creation, updates, and deletions**.

- **Dynamic Toast Generation:** 
  - Uses `document.createElement("div")` to create toast containers dynamically.
- **Auto-dismissal:** 
  - Uses `setTimeout()` to remove notifications after 5 seconds.
- **Keyboard Accessibility:**
  - `Tab` focusable and closable using `Escape` key.
- **Color-coded Feedback:**
  - **Success (green)**: Task added successfully.
  - **Error (red)**: Failed to save task.
  - **Info (blue)**: Info about action.
  - **Warning (yellow)**: Missing required fields.

<div align="center">
   <img width="308" alt="image" src="https://github.com/user-attachments/assets/bb645e09-7a5e-4152-8539-8e5b0e300430" />

   <img width="317" alt="image" src="https://github.com/user-attachments/assets/be78501b-5d28-4edb-ae75-50870a84213b" />
</div>

**Reference:** Used code from [GeeksForGeeks](https://www.geeksforgeeks.org/how-to-make-a-toast-notification-in-html-css-and-javascript/) with minimal changes

###  **5. Advanced Keyboard Navigation**

- **Tab Trapping:** `trapFocus()` ensures users can only navigate within an open modal.
- **Escape Key Handling:** `handleEscapeKey()` allows quick modal closing.
- **Keyboard Shortcuts:**
  - `Enter` submits forms and confirms actions.
  - `Tab` cycles through interactive elements.
 

<div align="center">
  <img src="https://github.com/user-attachments/assets/f20e070a-ec9b-4983-91c0-7bf2dd0158a6" alt="trap-focus">
</div>

**Reference:** [Hidde Blog](https://hidde.blog/using-javascript-to-trap-focus-in-an-element/), [Zach Patrick](https://zachpatrick.com/blog/how-to-trap-focus-inside-modal-to-make-it-ada-compliant) and [More](https://github.com/larevolucia/task-wrangler/issues/17)

## **6. Insights & Analytics (Task Progress Charts)**

Uses **Google Charts API** to visualize task progress.


<div align="center">
   <img width="308" alt="image" src="https://github.com/user-attachments/assets/3e3da238-6907-4c66-83a4-48a2686a4b04" />
</div>

### **6.1 Status Breakdown Chart**

- **Pie Chart Representation** of tasks categorized as **To-Do, In Progress, and Done**.
- **Data Fetching:** Reads `localStorage` and processes counts via `reduce()`.
- **Color Coding:** Uses same colors used on task cards for consistency.
  - **To-Do (yellow)**
  - **In Progress (blue)**
  - **Done (green)**
- Dynamically updates as tasks are added/edited.

### **6.2 Overdue Task Analysis**

- **Overdue vs On-Time Tasks Pie Chart**
- Highlights overdue tasks in **red** and on-time tasks in **green**.
- Dynamically updates as tasks are added/edited.

### **6.3 Responsive Charts**

- **Auto-resizes on window resize** using `window.addEventListener("resize", drawCharts)`.
- Charts adapt to screen size, maintaining clarity.

---

## **Additional Enhancements**
- **LocalStorage Integration:** 
  - Tasks persist between sessions without requiring a backend.
- **Error Handling:** 
  - Catches `JSON.parse()` failures and resets `localStorage` to prevent app crashes.
- **ARIA Compliance:** 
  - Uses `aria-live="polite"` for toast notifications to be screen reader-friendly.
  - `aria-labelledby` ensures task descriptions are properly linked.
- **Lightweight & Fast:** 
  - No external dependencies beyond Google Charts API.

---
## Testing

### Manual Testing 
[Issue #5](https://github.com/larevolucia/task-wrangler/issues/5)

#### User actions
- Create a task (mouse, keyboard)
- Edit a task (mouse, keyboard)
- Open task card details (mouse, keyboard)
- Delete a task (mouse, keyboard)
- Form Validation:
  - Save task (create / edit) without title
  - Save task (create / edit) with date in past
- Move focus with tab on modal (expected to be trapped in modal)
- Close modals with escape key
- Save tasks (create / edit) with enter on submit button
- Read insights chart
- Navigate to GitHub in new tab

#### Technical testing
- Used Developer Tools and Console to validate changes in localStorage (Developer Tools > Application > Storage > Local Storage)

### Automated Testing  
[Issue #26](https://github.com/larevolucia/task-wrangler/issues/26)

- [Jshint.com](https://jshint.com/): No errors or warnings.
- [Jigsaw CSS Validator](https://jigsaw.w3.org/css-validator/): No errors. Warnings related to Google Fonts and use of variables are shown.
- [W3C HTML Validatior](https://validator.w3.org/): No errors or warnings.
- [Accessibility Checker](https://www.accessibilitychecker.org/): Audit Score 95
- [WAVE](https://wave.webaim.org/): No errors. One alert related to both logo and "Tasks" links on nav directing user to same page.
- Lighthouse: Tests performed for mobile device
    <details>
      <summary>Desktop Tasks</summary>
      <img src="https://github.com/user-attachments/assets/6618d120-3c51-42d6-b86b-550d5cbd4dc7">
    </details>
    <details>
      <summary>Desktop Insights</summary>
      <img src="https://github.com/user-attachments/assets/c9ce57ab-fcd3-47fa-bd5d-25136ab8c4f8">
    </details>
    <details>
      <summary>Mobile Tasks</summary>
      <img src="https://github.com/user-attachments/assets/5e1fdf81-5abb-48b1-a255-8b9274a3c053">

    </details>
    <details>
      <summary>Mobile Insights</summary>
      <img src="https://github.com/user-attachments/assets/363ca5b3-bfac-4505-8818-016d488f5504">
    </details>


### Bugs & Issues

All issues are documented in this [Project View](https://github.com/users/larevolucia/projects/5/views/3)

# Bug Fixes and Updates

This document contains a list of bugs and their corresponding fixes, organized by ticket creation date.

## List of Fixed Issues

### 1. Create Task Not Working / Add new task button inconsistency
- **Issue:** [#18](https://github.com/larevolucia/task-wrangler/issues/18), [#25](https://github.com/larevolucia/task-wrangler/issues/25)
- **Summary of Fix:** Change 'create-task' id from icon to button.
- **Commit:** [4e7aad2](https://github.com/larevolucia/task-wrangler/commit/4e7aad2f45c9156f8a09afecb9a62eac1496bfa4)

### 2. CloseModal can't access form container
- **Issue:** [#19](https://github.com/larevolucia/task-wrangler/issues/19)
- **Summary of Fix:** The `formContainer` variable was changed from a local to a global scope, allowing the `CloseModal` function to properly access and close the form container.
- **Commit:** [63fa163](https://github.com/larevolucia/task-wrangler/commit/63fa163)

### 3. CloseModal function inconsistent behavior
- **Issue:** [#20](https://github.com/larevolucia/task-wrangler/issues/20)
- **Summary of Fix:** Ensured the modal is fully removed from the DOM after being triggered once, resolving the inconsistent behavior of the `CloseModal` function.
- **Commit:** [b283efa](https://github.com/larevolucia/task-wrangler/commit/b283efa)

### 4. Impossible to Edit Overdued Task
- **Issue:** [#21](https://github.com/larevolucia/task-wrangler/issues/21)
- **Summary of Fix:** Changed `min` attribute on form to match the original dueDate instead of today.
- **Commit:** [42891af](https://github.com/larevolucia/task-wrangler/commit/42891af3b379fd5239d4d2d873a9e1974822f2e4)

### 5. Cards appear side by side instead of stacked
- **Issue:** [#27](https://github.com/larevolucia/task-wrangler/issues/27)
- **Summary of Fix:** Adjusted the CSS by modifying the `display` property of the `task-container` to ensure cards are stacked vertically as intended.
- **Commit:** [3816ee6](https://github.com/larevolucia/task-wrangler/commit/3816ee633d67bbbbc80557ae5f26fc2ea49c07c5)

### 36. emptyStateMessage is not defined
- **Issue:** [#28](https://github.com/larevolucia/task-wrangler/issues/28)
- **Summary of Fix:** Declared the `emptyStateMessage` variable before calling it to prevent the "ReferenceError: emptyStateMessage is not defined" error in the `drawCharts` function.
- **Commit:** [1c92d82](https://github.com/larevolucia/task-wrangler/commit/1c92d825a5dbe2969b18be61e8b7d18688d82028)

### 7. Tasks not updating
- **Issue:** [#29](https://github.com/larevolucia/task-wrangler/issues/29)
- **Summary of Fix:** Re-added code that was accidentally removed when creating the conditional logic that displays toast notifications for both unchanged and changed tasks.  
- **Commit:** [8db3584](https://github.com/larevolucia/task-wrangler/commit/8db358464c8f932fd1f427a4d8fe02b4097f4b6b)

### 8. W3C validator issues
- **Issue:** [#31](https://github.com/larevolucia/task-wrangler/issues/31)
- **Summary of Fix:** Addressed W3C validation errors and warnings in `index.html` and `insights.html` by correcting the HTML structure and ensuring compliance with W3C standards.
- **Commit:** [376cc57](https://github.com/larevolucia/task-wrangler/commit/376cc57d775c3738a3d45ba856f41f567bd53b4b), [717fb83](https://github.com/larevolucia/task-wrangler/commit/717fb83676532cb4a8abf70ecbf7d80c1555ce6d)

### 9. Jigsaw error: f0f0f0 is not a color
- **Issue:** [#32](https://github.com/larevolucia/task-wrangler/issues/32)
- **Summary of Fix:** Corrected the color value from `f0f0f0` to `#f0f0f0` to comply with valid color formats, resolving the Jigsaw validation error.
- **Commit:** [f95a81a](https://github.com/larevolucia/task-wrangler/commit/f95a81a)

### 10. WAVE alerts and errors
- **Issue:** [#33](https://github.com/larevolucia/task-wrangler/issues/33)
- **Summary of Fix:** Fixed accessibility issues identified by the WAVE tool, including missing headings and low contrast text, to enhance the website's accessibility.
- **Commit:** [f95a81a](https://github.com/larevolucia/task-wrangler/commit/f95a81a7cc4869bd900c5c6174e99f6cedda234a), [f61438d](https://github.com/larevolucia/task-wrangler/commit/f61438dc3beaaef97eecc4472bead4f5403df4cf), [48715dd](https://github.com/larevolucia/task-wrangler/commit/48715dd19a1dee46c783ba1509f1e0f43ee0ea49), [97461cf](https://github.com/larevolucia/task-wrangler/commit/97461cf605b2bcc0ceebfac847c25f4cd7d2db0f)

### 11. DueDate line break on Overdue Task
- **Issue:** [#35](https://github.com/larevolucia/task-wrangler/issues/35)
- **Summary of Fix:** Adjusted the CSS adding a `min-width` to prevent line breaks in the due date display for overdue tasks, ensuring the date appears on a single line.
- **Commit:** [1d109ad](https://github.com/larevolucia/task-wrangler/commit/1d109ad)

### 12. Last focused element lost after Toast Notification / Delete task
- **Issue:** [#30](https://github.com/larevolucia/task-wrangler/issues/30)
- **Summary of Fix:** Initial fix implemented `tabindex` to contentContainer element and directed the focus to that element after delete. Later that was moved to taskListContainer. Final fix moved the notifications code to an idenpendent js file and introduce parameters for `lastFocusedEl` and a `fallbackFocusEl`. The new parameters allowed more flexibility to define behavior in different scenarios and prepares for further use when scaling the application.
- **Commit:** [78ae558](https://github.com/larevolucia/task-wrangler/commit/78ae558813aea556cbde309d4697ce01793941bb), [0c7afb1](https://github.com/larevolucia/task-wrangler/commit/0c7afb167599b01b02480a72a7683107a737fcbd), [29fdb24](https://github.com/larevolucia/task-wrangler/commit/29fdb24fa2eddac08893668564af0ead522c6d0a)

### 13. Focus resets to taskListContainer
- **Issue:** [#37](https://github.com/larevolucia/task-wrangler/issues/37)
- **Summary of Fix:** Explicit reset of focus on closeModal and closeToast resets the focus even after user has navigated to other elements using tab. Conditional was added at the end of each function to check if the focus was already on a valid element, preventing explicit reset after user navigated elsewhere.
- **Commit:** [2673c2c](https://github.com/larevolucia/task-wrangler/commit/2673c2c83f77ebf4525cbc477c758434ce87296e), [2d34ec0](https://github.com/larevolucia/task-wrangler/commit/2d34ec0afc107438e21bd188088aa959396bca0b)

### 14. Multiple Empty Task List messages on Insights page
- **Issue:** [#38](https://github.com/larevolucia/task-wrangler/issues/38)
- **Summary of Fix:** Added conditional to `handleEmptyInsights` to only append message if the message doesn't already exists.
- **Commit:** [03716e9](https://github.com/larevolucia/task-wrangler/commit/03716e99e5868b31425faaf4ef9ae0d251769bc1)

## Unfixed issues

 ### 1. Jigsaw warnings: Font Imports and variables
- **Issue:** [#26](https://github.com/larevolucia/task-wrangler/issues/26)
- **Justification:** It's common practice to use imports for fonts and variables for styling.

### 2. WAVE alerts: Redundant link: Adjacent links go to the same URL
- **Issue:** [#33](https://github.com/larevolucia/task-wrangler/issues/33)
- **Justification:** It's common practice for logo to also redirect to home.

### 3. Error loading charts
- **Issue:** [#36](https://github.com/larevolucia/task-wrangler/issues/36)
- **Summary of Fix:** DataTable was undefined when loading the screen. I couldn't fix it, but to mitigate it, I added a try...catch to prevent app from crashing. Error seems non-critical as the charts eventually do load without crashing. Common user is unlikely to notice any issue.
- **Commit:** [d664ec4](https://github.com/larevolucia/task-wrangler/commit/d664ec4fc6d28419e00a779878d636350cf0bddc)
  
---
## Deployment

This project was deployed using GitHub Pages. Steps to deploy are as follow:

1. Go to your repository on GitHub.com
2. Select 'Settings' on the repository top menu.
3. Select 'Pages' on the left side menu.
4. Under 'Build and deployment', go to 'Branch' dropdown and select 'main'.
5. Ensure that the selected folder is /root
6. Once done, click on 'Save'.
7. You should receive a deployment confirmation, followed by the web address.

---
## Technologies Used

### Languages

- HTML5
- CSS
- JavaScript

### Resources Used

- [Mozilla](https://developer.mozilla.org/en-US/)
- [w3.org](https://www.w3.org/)
- [Dev.to](https://dev.to/)
- [StackOverflow](stackoverflow.com)
- [a11y-collective](https://www.a11y-collective.com/)
- [Coolors](https://coolors.co/)
- [Google Fonts](https://fonts.google.com/)
- [Flaticon](https://www.flaticon.com/)
- [favicon.io](https://favicon.io/)
- [FontAwesome](https://fontawesome.com/)
- [AmIResponsive](https://ui.dev/amiresponsive) to test responsiveness
- [Responsinator](http://www.responsinator.com/) to test responsiveness
- ChatGPT for documentation review and to explain referenced code when not initially understood (e.g. TrapFocus and CSS for Notifications).

---
## Credits

### Logo Attribution

- Logo Icons made by [Rizki Ahmad Fauzi](https://www.flaticon.com/authors/rizki-ahmad-fauzi) from [Flaticon](https://www.flaticon.com/).

## Acknowledgments

- Friends and family who tested the application to provide valuable feedback.
- My mentor for pushing me to improve the code 
