document.addEventListener('DOMContentLoaded', function() {
    updateAddPetButtonVisibility();
    populatePetSelects(); // Populate the pet dropdowns as soon as the page loads
});

// Function to update the visibility of the "Add Pet" button based on login status and user role
function updateAddPetButtonVisibility() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userRole = sessionStorage.getItem('userRole');
    const addPetButton = document.getElementById('addPetButton');

    if (isLoggedIn && userRole === 'staff') {
        addPetButton.style.display = 'block'; // Show button for staff
    } else {
        addPetButton.style.display = 'none'; // Hide button for others
    }
}

// Event listener for the login form
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const validUsers = {
        user: { username: 'Sleeping', password: 'User' },
        staff: { username: 'Sleeping', password: 'Staff' }
    };

    if (validUsers[role] && username === validUsers[role].username && password === validUsers[role].password) {
        document.getElementById('message').textContent = `Welcome, ${username}! You are logged in as ${role}.`;
        
        // Set session storage for login status
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userRole', role);

        updateAddPetButtonVisibility();
    } else {
        document.getElementById('message').textContent = 'Invalid credentials, please try again.';
    }
});

// Event listener for logout
document.getElementById('logoutButton')?.addEventListener('click', function() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');

    updateAddPetButtonVisibility(); // Update visibility on logout
});

// Function to populate pet dropdowns (edit and remove pet)
function populatePetSelects() {
    const pets = JSON.parse(localStorage.getItem('pets')) || [];

    const editPetSelect = document.getElementById('editPetName');
    const removePetSelect = document.getElementById('removePetSelect');

    editPetSelect.innerHTML = '<option value="">-- Select a Pet --</option>';
    removePetSelect.innerHTML = '<option value="">-- Select a Pet --</option>';

    pets.forEach(pet => {
        const editOption = document.createElement('option');
        editOption.value = pet.name;
        editOption.textContent = pet.name;
        editPetSelect.appendChild(editOption);

        const removeOption = document.createElement('option');
        removeOption.value = pet.name;
        removeOption.textContent = pet.name;
        removePetSelect.appendChild(removeOption);
    });
}

// Event listener for adding a new pet
document.getElementById('addPetForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const name = document.getElementById('newPetName').value;
    const breed = document.getElementById('newPetBreed').value;
    const age = document.getElementById('newPetAge').value;
    const image = document.getElementById('newPetImage').value;

    // Create a new pet object
    const newPet = { name, breed, age, image };

    // Retrieve the current list of pets from localStorage
    let pets = JSON.parse(localStorage.getItem('pets')) || [];

    // Add the new pet to the array
    pets.push(newPet);

    // Save the updated pets list back to localStorage
    localStorage.setItem('pets', JSON.stringify(pets));

    // Alert user and refresh dropdowns
    alert('New pet added successfully!');
    populatePetSelects(); // Refresh the pet lists after adding
});
