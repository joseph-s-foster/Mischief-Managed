const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log(response);
    document.location.replace("/");
    updateLogoutButtonVisibility();
  } else {
    alert("Failed to log out.");
  }
};

const updateLogoutButtonVisibility = () => {
  const logoutButton = document.getElementById("logoutButton");
  const loggedIn = true;

  if (loggedIn) {
    logoutButton.style.display = "flex";
    logoutButton.style.alignItems = "center";
    logoutButton.style.justifyContent = "center";
  } else {
    logoutButton.style.display = "none";
  }
};

document.querySelector("#logoutButton").addEventListener("click", logout);

updateLogoutButtonVisibility();
