let loggedIn = false;  // Assume the user is not initially logged in

const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password_hash = document.querySelector("#password-login").value.trim();
  if (email && password_hash) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password_hash }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      loggedIn = true;  // Update login status when successful login
      document.location.replace("/session");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-signup").value.trim();
  const password_hash = document.querySelector("#password-signup").value.trim();
  if (email && password_hash) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password_hash }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      loggedIn = true;  // Update login status when successful signup
      document.location.replace("/session");
    } else {
      console.log("Failed to sign up.");
    }
  }
};

const updateLogoutButtonVisibility = () => {
  const logoutButton = document.getElementById('logoutButton');

  if (loggedIn) {
    logoutButton.style.display = 'block';
  } else {
    logoutButton.style.display = 'none';
  }
};

const updateHeaderVisibility = () => {
  const header = document.querySelector('header');

  if (loggedIn) {
    header.style.display = 'none';
  } else {
    header.style.display = 'flex';
  }
};

document.querySelector("#login").addEventListener("click", async (event) => {
  await loginFormHandler(event);
  updateLogoutButtonVisibility();
  updateHeaderVisibility();
});

document.querySelector("#signup").addEventListener("click", async (event) => {
  await signupFormHandler(event);
  updateLogoutButtonVisibility();
  updateHeaderVisibility();
});
