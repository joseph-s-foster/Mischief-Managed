const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("test");
  const email = document.querySelector("#email-login").value.trim();
  const password_hash = document.querySelector("#password-login").value.trim();
  const bcrypt = require('bcrypt');

  if (email && password_hash) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password_hash }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/session");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password_hash = document.querySelector("#password-login").value.trim();
  console.log(email, password_hash);
  if (email && password_hash) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email: email, password_hash: password_hash }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/session");
    } else {
      console.log(response);
      console.log("Failed to sign up.");
    }
  }
};

document.querySelector("#login").addEventListener("click", loginFormHandler);

document.querySelector("#signup").addEventListener("click", signupFormHandler);
