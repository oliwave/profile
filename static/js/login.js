// const API_URL = 'http://localhost:5001/login';
const API_URL = 'https://profile-cs633.vercel.app/login';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  // Add a click event listener to the login button
  loginForm.addEventListener('submit', (event) => {
    // Prevent the form's default submission behavior
    event.preventDefault();

    // Retrieve the input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform the login logic
    if (email && password) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      })
        .then(response => {
          if (response.status === 400) {
            return response.json().then((data) => {
              throw new Error(data.error || 'Invalid request. Please check your input.');
            });
          }

          if (response.status === 401) {
            return response.json().then((data) => {
              throw new Error(data.error || 'Invalid request. Please check your input.');
            });
          }

          if (response.redirected) {
            window.location.href = response.url
          }

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          // Handle network or server errors
          console.error('Error:', error.message);
          alert(`Error: ${error.message}`);
        });
    } else {
      alert('Please enter both username and password.');
    }
  });
});
