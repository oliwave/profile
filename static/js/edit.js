document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById("submit_button");
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    
    fetch(`/api/user/${userId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  })
  .then(profileUser => {
    editableElements.forEach((element) => {
      const eid = element.id;
      if (profileUser[eid]) {
        element.innerText = profileUser[eid];
      }
    });
  })
  .catch(error => {
    console.error("Error fetching user data:", error);
  });

    console.log("user id:", userId);

    editableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.setAttribute('title', 'Click to edit');
        });

        element.addEventListener('mouseleave', () => {
            element.removeAttribute('title');
        });

        element.addEventListener('focus', () => {
            console.log(`Editing: ${element.innerText}`);
        });

        element.addEventListener('blur', () => {
            console.log(`Edited content: ${element.innerText}`);
        });
    });

    saveButton.addEventListener('click', async () => {
        const data = {};

        editableElements.forEach((element, index) => {
            const id = element.id || `editable_${index}`;
            data[id] = element.innerText.trim();
        });

        try {
            const response = await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Changes saved successfully!');
                console.log('Server response:', result);

                // Redirect to user profile
                window.location.href = `/user/${userId}`;
            } else if (response.status === 400) {
                const error = await response.json();
                alert(`Validation Error: ${error.error}`);
            } else if (response.status === 401) {
                alert("You are not authorized to perform this action.");
                window.location.href = '/login'; 
            } else if (response.status === 404) {
                alert("User not found. Please try again.");
            } else {
                throw new Error('Failed to save changes');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving changes. Please try again.');
        }
    });
});