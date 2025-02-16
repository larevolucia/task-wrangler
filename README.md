# TaskWrangler

Many people feel overwhelmed when managing their to-do lists, making it difficult to stay motivated. Traditional to-do apps often overcomplicate things with excessive features while neglecting simplicity and motivation. As a result, these apps can become cumbersome to use, causing users to lose focus on their goals and abandon task management altogether.

**TaskWrangler** goes back to basics and is designed to be a simple, beginner-friendly to-do app aimed at making task management intuitive and motivating.

The app enables users to:

- Organize tasks effectively by adding, editing, and deleting tasks.
- Organize tasks based on their status of completeness.
- Prioritize tasks by setting due dates and highlighting overdue items with visual cues.
- Track progress visually with insightful charts.

By focusing on simplicity, usability, and motivation, **TaskWrangler** empowers users to manage their tasks consistently without feeling overwhelmed.

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
- [As an user I want to see my list of tasks so I can have an overview of items to prioritize.](https://github.com/larevolucia/task-wrangler/issues/16)
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

Considering primary function of the app is managing tasks, it was decided to keep with simple color scheme.
It was selected worldwide recognizable colors for tracking progress: green, yellow, red.

For the base of the app, a neutral blue was chosen, since it is a calming color that doesn't clash with the traffic light scheme.
A white hex was selected for the background and a black hex was selected for the text color.

<details>
  <summary>Color Palette</summary>
<img width="783" alt="image" src="https://github.com/user-attachments/assets/85d434e3-954c-4238-9513-c8299b8b2aed">
</details>


### Fonts

For TaskWrangler, [Inter](https://fonts.google.com/specimen/Inter) was selected as the primary font, used for the body text and logo, and [Roboto](https://fonts.google.com/specimen/Roboto) as the secondary font for headings and toast notifications to optimize readability and maintain a clean, modern asthetic.

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
## Features

### Navigation

Provides a responsive and accessible navigation bar for seamless access to site sections, improving user experience across devices. The design dynamically adapts to screen size, ensuring intuitive and space-efficient navigation on both small and large screens.

---
## Testing

### Manual Testing 


### Automated Testing  


### Accessibility Testing  


### Peer Review and User Feedback



### Bugs & Issues

All issues are documented in this [Project View](https://github.com/users/larevolucia/projects/5/views/3)


### Unfixed issues

---
## Deployment

This project was deployed using GitHub pages. Steps to deploy are as follow:

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
- Javascript

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
- [Tinypng](https://tinypng.com/) to optmize the images
- [Responsinator](http://www.responsinator.com/) to test responsiveness
- ChatGPT for documentation review and to explain other  peoples' codes used.

---
## Credits

### Logo Attribution

Logo Icons made by [Rizki Ahmad Fauzi](https://www.flaticon.com/authors/rizki-ahmad-fauzi) from [Flaticon](https://www.flaticon.com/).

## Acknowledgments

