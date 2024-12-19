// Check if the user is logged in when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedIn')) {
        showSecuredPage();
    } else {
        showLoginForm();
    }
});

// Registration Logic
document.getElementById('register-btn').addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            displayMessage('Username already exists. Please choose another.');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            displayMessage('Registration successful! You can now log in.');
            showLoginForm();
        }
    } else {
        displayMessage('Please fill in both fields.');
    }
});

// Login Logic
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('loggedInUser', username);
            showSecuredPage();
        } else {
            displayMessage('Invalid username or password.');
        }
    } else {
        displayMessage('Please fill in both fields.');
    }
});

// Logout Logic
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInUser');
    showLoginForm();
});

// Show Login Form
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('secured-page').style.display = 'none';
    document.getElementById('message').textContent = '';
}

// Show Secured Page
function showSecuredPage() {
    const username = localStorage.getItem('loggedInUser');
    document.getElementById('user-name').textContent = username;
    document.getElementById('secured-page').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('message').textContent = '';
}

// Display Messages
function displayMessage(message) {
    document.getElementById('message').textContent = message;
    setTimeout(() => {
        document.getElementById('message').textContent = '';
    }, 3000);
}
