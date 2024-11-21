// const API_URL = 'http://localhost:5001/api/user';
const API_URL = 'http://profile-cs633.vercel.app/api/user';

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  // Add a click event listener to the login button
  signupForm.addEventListener('submit', (event) => {
    // Prevent the form's default submission behavior
    event.preventDefault();

    // Retrieve the input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    // Perform the signup logic
    if (email && password && name) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name
        }),
      })
        .then((response) => {
          if (response.status === 400) {
            // Handle 400 error specifically
            return response.json().then((data) => {
              throw new Error(data.error || 'Invalid request. Please check your input.');
            });
          } else if (!response.ok) {
            // Handle other non-2xx status codes
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
          alert('Account created successfully!');

        })
        .catch((error) => {
          // Handle network or server errors
          console.error('Error:', error.message);
          alert(`Error: ${error.message}`);
          // window.location.href = 
        });
    } else {
      alert('Please enter both username, email and password.');
    }
  });
});
