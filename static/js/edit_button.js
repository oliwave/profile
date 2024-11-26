const editButton = document.getElementById('edit-mode-toggle');

editButton.addEventListener('click', () => {
    window.location.href = `/user/edit/${user_id}`;
});