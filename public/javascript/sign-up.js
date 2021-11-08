// Handle on signup button
const signupBtn = document.querySelector('#signupBtn');

// Send user info to database
async function signupHandler(event) {
  event.preventDefault();
  // retrieve username, password, email, twitter, and interests
  const username = document.querySelector('#inputUsername3').value.trim();
  const password = document.querySelector('#inputPassword3').value.trim();
  const email = document.querySelector('#inputEmail3').value.trim();
  const twitter = document.querySelector('#inputTwitter3').value.trim();
  const interestOne = document.querySelector('#interest1').value.trim();
  const interestTwo = document.querySelector('#interest2').value.trim();
  const interestThree = document.querySelector('#interest3').value.trim();
  const interestFour = document.querySelector('#interest4').value.trim();
  const interestFive = document.querySelector('#interest5').value.trim();

  // check that username and password values exist... if they do, send their info to the database
  if (
    password &&
    email &&
    username &&
    twitter &&
    interestOne &&
    interestTwo &&
    interestThree &&
    interestFour &&
    interestFive
  ) {
    const response = await fetch('/api/user', {
      method: 'Post',
      body: JSON.stringify({
        username,
        email,
        twitter,
        interestOne,
        interestTwo,
        interestThree,
        interestFour,
        interestFive,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log('Success!');
      document.location.replace('feed-routes');
    } else {
      alert(response.statusText);
    }
  }
}

// Add event listener to signupBtn, send user info to database
signupBtn.addEventListener('click', signupHandler);
