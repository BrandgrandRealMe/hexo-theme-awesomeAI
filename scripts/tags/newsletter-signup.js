'use strict'
// {% ns [type] [formURL] [captchaSiteKey] [formTitle] [emailLabel] [submitButtonText] %}
// {% endns %}

module.exports = () =>
  function (args, content) {
    const validTypes = ['keila', 'plunk']

    var type = null
    if (args[0] && validTypes.includes(args[0])) {
      type = args[0]
    } else {
      return null
    }

    var formURL = null
    if (args[1]) {
      formURL = args[1]
    } else {
      return null
    }

    let captchaSiteKey = null
    if (args[2]) {
      captchaSiteKey = args[2]
    } else {
      return null
    }

    let formTitle = 'Subscribe to our newsletter!'
    if (args[3]) {
      sizeClass = args[3]
    }

    let emailLabel = 'Email Address'
    if (args[4]) {
      emailLabel = args[4]
    }

    let submitButtonText = 'Subscribe'
    if (args[5]) {
      submitButtonText = args[5]
    }

    let acceptedMessage = 'You successfully subscribed! Thank you!'
    if (args[6]) {
      acceptedMessage = args[6]
    }

    let errorMessage = 'An error occurred. Please try again later.'
    if (args[7]) {
      errorMessage = args[7]
    }

    if (type == "keila") {
      return `
<form action="${formURL}" class="newsletter-form" method="post">
   <h1 class="form-title">
      ${formTitle}
   </h1>
   <div class="form-group">
      <label for="contact_email">
         ${emailLabel}
      </label>
      <input id="contact_email" name="contact[email]" type="email"/>
   </div>
   <div class="captcha-container">
      <div class="h-captcha" data-sitekey="${captchaSiteKey}" data-theme="dark"></div>
      <script async defer src="https://hcaptcha.com/1/api.js"></script>
   </div>
   <div class="button-container">
      <button class="submit-button">
         ${submitButtonText}
      </button>
   </div>
   <div class="fineprint">
   ${content}
   </div>
</form>
    `
    } else if (type == "plunk") {
      return `
    <script src="https://www.google.com/recaptcha/api.js?onload=onCaptchaLoad&render=${captchaSiteKey}"></script>
    <form class="newsletter-form" id="newsletterForm">
        <h1 class="form-title">${formTitle}</h1>
        <div class="form-group">
            <label for="contact_email">${emailLabel}</label>
            <input id="contact_email" name="contact[email]" type="email" required/>
        </div>
        <div class="button-container">
            <button type="submit" class="g-recaptcha submit-button" data-callback='onSubmit' data-action='submit' id="submit-button" data-sitekey="${captchaSiteKey}">${submitButtonText}</button>
        </div>
        <div class="msg" id="msg" style="visibility: hidden" data-accepted="${acceptedMessage}" data-error="${acceptedMessage}"></div>
        <div class="fineprint">${content}</div>
        <input type="hidden" id="apiToken" data-token="${formURL}">
    </form>
    `
    } else {
      return `<form class="newsletter-form" id="newsletterForm"><h1 class="form-title">PLEASE PROVIDE SETTINGS!</h1></form>`
    }
  }
