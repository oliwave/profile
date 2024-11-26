document.addEventListener('DOMContentLoaded', () => {

    let saveButton = document.getElementById("submit_button");
    saveButton.addEventListener('click', async () => {
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        const data = {};

        // Collect contenteditable data
        editableElements.forEach((element, index) => {
            const id = element.id || `editable_${index}`; // Use id if available; fallback to index
            data[id] = element.innerText.trim();
        });

        try {
            const response = await fetch('/edit_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Changes saved successfully!');
                console.log('Server response:', result);
            } else {
                throw new Error('Failed to save changes');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving changes. Please try again.');
        }
    });

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
});

