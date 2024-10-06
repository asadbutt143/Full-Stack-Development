// Function to initialize the app
function init() {
    // Load tasks from the API when the page loads
    fetchTasksFromAPI();
    // Set up event listener for the form submission
    document.getElementById('todoForm').addEventListener('submit', handleAddTask);
    // Set up event listener for task list actions
    document.getElementById('taskList').addEventListener('click', handleTaskActions);
    // Set up event listener for checkbox status change
    document.getElementById('taskList').addEventListener('change', handleCheckboxChange);
    // Set up event listener for search input
    document.getElementById('searchTask').addEventListener('keyup', handleSearch);
    // Set up event listener for filter options
    document.getElementById('filterOptions').addEventListener('change', function(e) {
        filterTasksByStatus(e.target.id.replace('filter', '').toLowerCase());
    });
}

// Function to fetch tasks from the mock API and display them
function fetchTasksFromAPI() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => response.json())
        .then(tasks => tasks.forEach(task => addTaskToDOM(task.title, task.id, task.completed)))
        .catch(error => console.error('Error fetching tasks:', error));
}

// Function to add a task to the DOM
function addTaskToDOM(taskText, taskId, isCompleted = false) {
    const li = document.createElement('li');
    li.setAttribute('data-id', taskId);
    li.setAttribute('data-text', taskText.toLowerCase()); // Store the task text for filtering

    // Create and append checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    li.appendChild(checkbox);

    // Create and append task text
    const textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

    // Append action buttons
    li.appendChild(createButton('Remove', 'removeTask'));
    li.appendChild(createButton('Edit', 'editTask'));

    // Append the task to the task list
    document.getElementById('taskList').appendChild(li);
}

// Helper function to create buttons
function createButton(text, className) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    return button;
}

// Function to handle adding a new task
function handleAddTask(e) {
    e.preventDefault(); // Prevent form from reloading the page

    const newTask = document.getElementById('newTask').value.trim();
    if (newTask) {
        const task = { title: newTask, completed: false };

        // Send the task to the API
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        })
        .then(response => response.json())
        .then(data => {
            addTaskToDOM(data.title, data.id); // Add the newly created task
            document.getElementById('newTask').value = ''; // Clear input field
        })
        .catch(error => console.error('Error adding task:', error));
    }
}

// Function to handle task actions (removal and editing)
function handleTaskActions(e) {
    const li = e.target.closest('li');
    if (!li) return; // Exit if no list item is found

    const taskId = li.getAttribute('data-id');

    if (e.target.classList.contains('removeTask')) {
        removeTask(taskId, li);
    } else if (e.target.classList.contains('editTask')) {
        editTask(li);
    }
}

// Function to remove a task
function removeTask(taskId, li) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                li.remove(); // Remove the task from the DOM
            } else {
                console.error('Error deleting task');
            }
        })
        .catch(error => console.error('Error deleting task:', error));
}

// Function to edit a task
function editTask(li) {
    const currentText = li.childNodes[1].textContent; // Get the current task text
    const newTaskText = prompt('Edit your task:', currentText);

    if (newTaskText !== null && newTaskText.trim()) {
        li.childNodes[1].textContent = newTaskText; // Update task text
        // Optionally, you could save the updated task to the API here
    }
}

// Function to handle checkbox changes
function handleCheckboxChange(e) {
    if (e.target.type === 'checkbox') {
        const li = e.target.closest('li');
        const taskId = li.getAttribute('data-id'); // Get task ID
        const isCompleted = e.target.checked; // Get checkbox status (completed or not)

        // Send PUT request to update the task's completed status on the API
        fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: isCompleted }) // Update the completed status
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            console.log(`Task ${taskId} marked as ${isCompleted ? 'completed' : 'incomplete'}`);
        })
        .catch(error => console.error('Error updating task:', error)); // Handle any errors
    }
}

// Function to handle search input
function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase(); // Get the input value
    const tasks = document.querySelectorAll('#taskList li'); // Get all tasks

    tasks.forEach(task => {
        const taskText = task.getAttribute('data-text'); // Get the stored task text
        task.style.display = taskText.includes(searchValue) ? '' : 'none'; // Show/hide tasks based on search
    });
}

// Function to filter tasks based on their completion status
function filterTasksByStatus(status) {
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(function(task) {
        const isCompleted = task.querySelector('input[type="checkbox"]').checked;

        // Show/hide tasks based on filter
        if (status === 'all') {
            task.style.display = 'block';
        } else if (status === 'completed' && isCompleted) {
            task.style.display = 'block';
        } else if (status === 'incomplete' && !isCompleted) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Initialize the app
window.addEventListener('DOMContentLoaded', init);
