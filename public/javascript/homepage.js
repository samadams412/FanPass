// // Handle on login and signup buttons
// const loginButton = document.getElementById('loginBtn');
// const signUpButton = document.getElementById('signUpBtn');

// async function handleLogin(event) {
//   event.preventDefault();

//   // Handle on username and password
//   const email = document.getElementById('email-login').value.trim();
//   const password = document.getElementById('password-login').value.trim();

//   console.log(email, password);
//   //console.log('loginBtn');
//   if (email && password) {
//     const response = await fetch('/api/user/login', {
//       method: 'Post',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (response.ok) {
//       document.location.replace('feed-routes');
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

// function handleSignup() {
//   // If signup is selected , route to sign-up page
//   document.location.replace('/sign-up');
// }

// // Event listeners for login and signup
// loginButton.addEventListener('click', handleLogin);
// signUpButton.addEventListener('click', handleSignup);
