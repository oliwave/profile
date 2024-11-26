const API_URL = 'http://localhost:5001/api/users';

const url = 'http://localhost:5001/user/';
// const API_URL = 'https://profile-cs633.vercel.app/api/users';

// const url = 'https://profile-cs633.vercel.app/user/';

const renderItem = (items) =>{
    
    const itemList = document.getElementById('users_container');
    items.forEach(item => {
        const listItem = document.createElement('li');

        const linkElement = document.createElement("a");

        linkElement.href = url + item["_id"];

        linkElement.textContent = item.name;
        listItem.appendChild(linkElement);

        const roleSpan = document.createElement('span');
        roleSpan.classList.add('role');
        roleSpan.textContent = item.email;
        listItem.appendChild(roleSpan);

        itemList.appendChild(listItem);
    });
}

fetch(API_URL)
  .then(response => {
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => {
    console.log('Fetched user data:', data);
    renderItem(data);
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
    const itemList = document.getElementById('users_container');
    itemList.textContent = 'Failed to load user data.';
  });

