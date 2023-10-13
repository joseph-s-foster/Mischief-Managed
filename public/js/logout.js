const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log(response);
    document.location.replace('/');
    updateLogoutButtonVisibility(); // Update logout button visibility
  } else {
    alert('Failed to log out.');
  }
};

const updateLogoutButtonVisibility = () => {
  const logoutButton = document.getElementById('logoutButton');
  const loggedIn = true; // Change this based on your actual login logic

  if (loggedIn) {
    logoutButton.style.display = 'flex';
    logoutButton.style.alignItems = 'center';
    logoutButton.style.justifyContent = 'center';
  } else {
    logoutButton.style.display = 'none';
  }
};

// Add an event listener to the logout button to handle the logout action
document.querySelector('#logoutButton').addEventListener('click', logout);

// Call the function to initially update the logout button visibility
updateLogoutButtonVisibility();

