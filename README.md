# Overview

**Task Tracker** is a simple web application that allows users to add, complete, edit, delete, and filter tasks directly in the browser.  
The goal of this project was to practice core web technologies—HTML, CSS, and JavaScript—and to demonstrate dynamic interaction, user input handling, and persistent data storage with `localStorage`.  
Through this project, I strengthened my skills in DOM manipulation, modular code organization, and accessibility design.

[Software Demo Video](https://youtu.be/S_ieKiY5K_U)

# Development Environment

- **Languages:** HTML, CSS, JavaScript (Vanilla ES6)
- **IDE:** Visual Studio Code
- **Version Control:** Git & GitHub
- **Runtime:** Browser (tested in Chrome, Safari, and Edge)
- **OS:** macOS

# Program Functionality

- Add new tasks with title and priority (Low, Normal, High)
- Mark tasks as *done* or *undone*
- Edit or delete existing tasks
- Filter tasks by **status** (All, Open, Done) and **priority** (Low, Normal, High)
- **Clear filters** button to quickly reset all filters and show all tasks
- Persistent data using the browser's **localStorage**
- Responsive and accessible interface built with semantic HTML and ARIA attributes
- Modern ES6 modules for clean code organization

# How to Run

1. Clone this repository: `git clone https://github.com/feippe/task-tracker-webapp.git`
2. Open the folder in Visual Studio Code or any code editor.
3. Launch the app:
    - **Option 1:** Open `index.html` directly in your browser.
    - **Option 2:** Use the Live Server extension in VS Code for auto-refresh.
4. Add, complete, and filter your tasks to test all functionality.

**Note:** This app uses ES6 modules, so it must be served over HTTP (not `file://`). Use a local server like Live Server, or open directly in modern browsers that support module scripts.

# Future Work

* Add color themes and dark/light mode toggle.
* Allow task deadlines and automatic sorting by date.
* Implement task categories or tags for better organization.
* Add bulk delete functionality for completed tasks.
* Save and sync data to a cloud database (Firebase) for multi-device access.
