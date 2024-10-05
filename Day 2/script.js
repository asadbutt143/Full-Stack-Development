// Add event listener for form submission
document.getElementById('userForm').addEventListener('submit', function(e) {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();

    // Get the value entered in the input field
    const username = document.getElementById('username').value;

    // If the input is not empty, display the welcome message
    if (username) {
        document.getElementById('welcomeMessage').textContent = `Welcome, ${username}!`;
    } else {
        document.getElementById('welcomeMessage').textContent = 'Please enter your name.';
    }
});

// Add click event listener to the button
document.getElementById('myButton').addEventListener('click', function() {
    // Display an alert when the button is clicked
    alert('Button clicked!');
});
