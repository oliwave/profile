const API_URL = 'http://localhost:5001/api/user';
//const API_URL = 'https://profile-cs633.vercel.app/api/user';

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

    Object.keys(profileUser).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        if (key === 'image') {
            element.innerHTML = `<img src="${profileUser[key]}" alt="Uploaded Image" width="400" height="250">`;
        } else if (key === 'pdf') {
            element.innerHTML = `<a href="${profileUser[key]}" target="_blank">View CV</a>`;
        } else {
            element.innerText = profileUser[key];
        }
    }
    });
  })
  .catch(error => {
    console.error("Error fetching profile user data:", error);
  });

});