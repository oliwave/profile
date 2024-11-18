const API_URL = 'http://localhost:5001/api/users';

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

const url = "http://localhost:5001";

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
        roleSpan.textContent = item.role;
        listItem.appendChild(roleSpan);

        itemList.appendChild(listItem);
    });
}

renderItem(items);
axios
  .get(API_URL)
  .then(response => {

    const item = response.data;
    renderItem(item);
  })
  .catch(error => {
    // Report error when get api goes wrong
    console.error('Error fetching user data:', error);
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