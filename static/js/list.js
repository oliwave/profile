const API_URL = 'http://profile-cs633.vercel.app/api/users';

const url = 'http://profile-cs633.vercel.app';

const renderItem = (items) =>{
    
    const itemList = document.getElementById('users_container');
    items.forEach(item => {
        const listItem = document.createElement('li');

        const linkElement = document.createElement("a");
        linkElement.href = url;
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

/*
axios
  .get(API_URL)
  .then(response => {

    const items = response.data;
    renderItem(items);
  })
  .catch(error => {
    // Report error when get api goes wrong
    console.error('Error fetching user data:', error);
    itemList.textContent = 'Failed to load user data.';
  });


          // Sample data for the list items
        const items = [
            { name: "Annie Zheng, MSHRM", role: "Talent Acquisition Partner at Bytedance" },
            { name: "Akhil Vashisht", role: "Delivery Manager @ MindSource" },
            { name: "Ryan Williams", role: "Technical Recruiter @ Optomi" },
            { name: "Yi-En (Ivy) Liu", role: "MS in Business Analytics'25 @ UC Irvine" },
            { name: "Shun Mok Bhark", role: "All things software" },
            { name: "Samantha Bueno", role: "Manager, Software Engineering at Red Hat" },
            { name: "Sunil Kumar", role: "Account Manager - Recruitment" },
            { name: "Yu Chen Hsiao", role: "IM@NCU" }
        ];

        // Get the <ul> element where we will add the list items
        const itemList = document.getElementById('users-container');

        // Loop through the items array and create <li> elements
        items.forEach(item => {
            // Create a new <li> element
            const listItem = document.createElement('li');
            
            // Set the content of the <li> element
            listItem.textContent = `${item.name} - ${item.role}`;
            
            // Append the <li> element to the <ul> element
            itemList.appendChild(listItem);
        });
*/