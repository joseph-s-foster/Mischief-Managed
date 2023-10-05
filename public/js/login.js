const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("test");
    const email = document.querySelector('#email-login').value.trim();
    const password_hash = document.querySelector('#password-login').value.trim();
  
    if (email && password_hash) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password_hash }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/session');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password_hash = document.querySelector('#password-login').value.trim();
    console.log(email, password_hash);
    if (email && password_hash) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password_hash }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  console.log("test");

  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', signupFormHandler);