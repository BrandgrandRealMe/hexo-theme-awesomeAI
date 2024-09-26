document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('contact_email').value;
  const msgElement = document.getElementById('accepted-msg');

  const apiToken = document.getElementById('apiToken').dataset.token;

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
            msgElement.style.visibility = "visible"
          }
          this.reset(); // Reset the form after successful submission
      })
      .catch(err => {
          console.error(err);
          alert('An error occurred. Please try again later.');
      });
});
