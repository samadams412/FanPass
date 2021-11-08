// Handle on login and signup buttons
const loginButton = document.getElementById('loginBtn');
const signUpButton = document.getElementById('signUpBtn');

async function handleLogin(event) {
  event.preventDefault();

  // Handle on username and password
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  console.log(username, password);
  console.log('loginBtn');
  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'Post',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('feed-routes');
    } else {
      alert(response.statusText);
    }
  }
}

function handleSignup() {
  // If signup is selected , route to sign-up page
  document.location.replace('/sign-up');
}

// Event listeners for login and signup
loginButton.addEventListener('click', handleLogin);
signUpButton.addEventListener('click', handleSignup);
