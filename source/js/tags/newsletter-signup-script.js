
const form = document.getElementById('newsletterForm');

const msgElement = document.getElementById('msg');

const apiToken = document.getElementById('apiToken').dataset.token;

const SiteKey = document.getElementById('msg').dataset.sitekey;

const acceptedMessage = document.getElementById('msg').dataset.accepted;
const errorMessage = document.getElementById('msg').dataset.error;

function showMessage(errorMessage) {
  msgElement.innerText = errorMessage;
  msgElement.style.opacity = 0; // Start with opacity 0 (invisible)
  msgElement.style.visibility = "visible"; // Make it visible

  // Animate opacity from 0 to 1 for fade-in effect
  const animationDuration = 1000; // Adjust duration as needed (in milliseconds)
  let currentOpacity = 0;
  const intervalId = setInterval(() => {
    currentOpacity += 0.1; // Increment opacity by 0.1 every interval

    if (currentOpacity >= 1) {
      currentOpacity = 1; // Ensure it doesn't go above 1
      clearInterval(intervalId); // Stop animation when fully opaque
    }

    msgElement.style.opacity = currentOpacity;
  }, animationDuration / 10); // Interval time based on duration
}


function onCaptchaLoad() {
  console.log("onCaptchaLoad")
}

function onSubmit(token) {
  if (token !== '') {
    let email = document.getElementById('contact_email').value;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiToken
      },
      body: JSON.stringify({
        "event": "user-signup",
        "email": email,
        "subscribed": true,
        "data": {}
      })
    };

    fetch('https://api.useplunk.com/v1/track', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.success) {
          showMessage(acceptedMessage)
          form.reset();
        } else {
          showMessage(errorMessage)
        }
      })
      .catch(err => {
        console.error(err);
        showMessage(errorMessage)
      });
  } else {
    showMessage("reCAPTCHA failed. Try again.")
  }
}
