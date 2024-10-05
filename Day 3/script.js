// Function to validate the input
function validateInput(input) {
    // Regular expression to allow only letters and spaces
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(input); // Returns true if input is valid, false otherwise
}

// Add event listener for form submission
document.getElementById('userForm').addEventListener('submit', function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the value entered in the input field
    const username = document.getElementById('username').value.trim();

    // If the input is valid, display the welcome message
    if (username && validateInput(username)) {
        document.getElementById('welcomeMessage').textContent = `Welcome, ${username}!`;
        document.getElementById('welcomeMessage').style.color = 'green'; // Success message in green
    } else {
        // Show an error message if the input is invalid
        document.getElementById('welcomeMessage').textContent = 'Please enter a valid name (letters only).';
        document.getElementById('welcomeMessage').style.color = 'red'; // Error message in red
    }
});

// Click event listener for the button
document.getElementById('myButton').addEventListener('click', function() {
    // Display an alert when the button is clicked
    alert('Button clicked!');
});
