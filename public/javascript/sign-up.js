// Handle on signup button
//const signupBtn = document.querySelector('#signupBtn');

// Send user info to database
async function signupHandler(event) {
  event.preventDefault();
  // retrieve username, password, email, twitter, and interests
  const username = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordConfirm = document.querySelector('#password-signup-confirm').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const twitter = document.querySelector('#twitter-signup').value.trim();
  const interestOne = document.querySelector('#interestOne').value.trim();
  const interestTwo = document.querySelector('#interestTwo').value.trim();
  const interestThree = document.querySelector('#interestThree').value.trim();
  const interestFour = document.querySelector('#interestFour').value.trim();
  const interestFive = document.querySelector('#interestFive').value.trim();
  console.log(username, password, email);
  // check that username and password values exist... if they do, send their info to the database
  if (
    username &&
    email &&
    password &&
    passwordConfirm &&
    twitter &&
    interestOne &&
    interestTwo &&
    interestThree &&
    interestFour &&
    interestFive
  ) {
    const response = await fetch('/api/users', {
      method: 'Post',
      body: JSON.stringify({
        username,
        email,
        password,
        passwordConfirm,
        twitter,
        interestOne,
        interestTwo,
        interestThree,
        interestFour,
        interestFive,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      if(password===passwordConfirm){
        console.log('Success!');
      console.log(username, password, email, twitter);
      document.location.replace('/dashboard');
      } else {
        console.log("passwords must match");
      }
    } else {
      alert(response.statusText);
    }
  }
}

// Add event listener to signupBtn, send user info to database
document
  .querySelector('.signup-form-2')
  .addEventListener('submit', signupHandler);
