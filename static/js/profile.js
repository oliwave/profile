// const API_URL = 'http://localhost:5001/api/user';
// const API_URL = 'https://profile-cs633.vercel.app/api/user';

document.addEventListener("DOMContentLoaded", () => {
  console.log("user id:", user_id);
  const loggedInUserEmail = sessionStorage.getItem('userEmail');
  console.log('Logged-in user email:', loggedInUserEmail);

  fetch(`/api/user/${user_id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  })
  .then(profileUser => {
    const profileEmail = profileUser.email;
    console.log("Profile email:", profileEmail);
    if (loggedInUserEmail === profileEmail) {
      document.getElementById('edit-mode-toggle').style.display = 'block';
    } else {
      document.getElementById('edit-mode-toggle').style.display = 'none';
    }

    const contactButton = document.getElementById('contactButton');
    contactButton.addEventListener('click', () => {
        const mailtoLink = `mailto:${profileEmail}`;
        window.location.href = mailtoLink; 
    });

    Object.keys(profileUser).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        element.innerText = profileUser[key];
      }
    });
  })
  .catch(error => {
    console.error("Error fetching profile user data:", error);
  });

});