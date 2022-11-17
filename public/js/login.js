var sigInL = document.querySelector('.login-form');
var sigUpL = document.querySelector('.signup-form');

sigInL.addEventListener('submit',handleLogin);
sigUpL.addEventListener('submit',handleSub);
 
 
 async function handleLogin(e) {
  e.preventDefault();
  let email = document.querySelector('#email').value.trim();
  let password = document.querySelector('#passw').value.trim();

  if (email && password) {
    await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
      return document.location.replace('/');
  }
};

async function handleSub(e){
  e.preventDefault();

  let name = document.querySelector('#name-signup').value.trim();
  let email = document.querySelector('#newmail').value.trim();
  let password = document.querySelector('#newpass').value.trim();

  if (name && email && password) {
     await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
     return document.location.replace('/');
   }
};

