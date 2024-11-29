const logoutButton = document.getElementById('logout_button');

logoutButton.addEventListener('click', () => {
    fetch('http://localhost:5001/logout', {
    //'https://profile-cs633.vercel.app/logout';
        method: 'GET', // Use GET because your backend requires it
        credentials: 'include', // Include session cookies if necessary
    })
    .then(response => {
        if (response.ok) {
            console.log("Logged out successfully");
            window.location.href = "/login"; // Redirect to login page
        } else {
            throw new Error("Logout failed");
        }
    })
    .catch(error => console.error("Error logging out:", error));
});
