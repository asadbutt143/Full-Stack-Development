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

        // Append the task to the task list
        document.getElementById('taskList').appendChild(li);

        // Clear the input field after adding the task
        document.getElementById('newTask').value = '';

        // Save tasks to local storage after adding
        saveTasks();
    }
});

// Event listener for task removal
document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.classList.contains('removeTask')) {
        // Remove the clicked task from the list
        e.target.parentElement.remove();

        // Save tasks to local storage after removing
        saveTasks();
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

        document.getElementById('taskList').appendChild(li);
    });
}
