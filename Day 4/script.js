// Event listener for the form submission
document.getElementById('todoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Get the value of the new task
    const newTask = document.getElementById('newTask').value;

    // Check if the input is not empty
    if (newTask.trim()) {
        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = newTask;

        // Add a remove button to each task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'removeTask';
        li.appendChild(removeBtn);

        // Add an edit button to each task
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'editTask';
        li.appendChild(editBtn);

        // Append the task to the task list
        document.getElementById('taskList').appendChild(li);

        // Clear the input field after adding the task
        document.getElementById('newTask').value = '';

        // Save tasks to local storage after adding
        saveTasks();
    }
});

// Event listener for task removal and editing
document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.classList.contains('removeTask')) {
        // Remove the clicked task from the list
        e.target.parentElement.remove();
        saveTasks(); // Save tasks to local storage after removing
    }

    if (e.target.classList.contains('editTask')) {
        // Edit the clicked task
        const taskItem = e.target.parentElement;
        const taskText = taskItem.firstChild.textContent; // Get current task text
        const newTaskText = prompt('Edit your task:', taskText); // Prompt for new text

        // If a new task text was provided
        if (newTaskText !== null && newTaskText.trim()) {
            taskItem.firstChild.textContent = newTaskText; // Update task text
            saveTasks(); // Save tasks to local storage after editing
        }
    }
});

// Load tasks from local storage when the page loads
window.addEventListener('DOMContentLoaded', loadTasks);

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(function(task) {
        tasks.push(task.firstChild.textContent); // Store only task text
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'removeTask';
        li.appendChild(removeBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'editTask';
        li.appendChild(editBtn);

        document.getElementById('taskList').appendChild(li);
    });
};

// Function to filter tasks based on search input
function filterTasks() {
    const searchValue = document.getElementById('searchTask').value.toLowerCase();
    const tasks = document.querySelectorAll('#taskList li');

    tasks.forEach(function(task) {
        const taskText = task.firstChild.textContent.toLowerCase();
        if (taskText.includes(searchValue)) {
            task.style.display = 'block'; // Show matching tasks
        } else {
            task.style.display = 'none'; // Hide non-matching tasks
        }
    });
}
