const emailFormWrapper = document.querySelector(".newsletter");
const emailForm = document.querySelector(".newsletter form");

function validateEmail(email) {
  let result;
  const re = new RegExp("\\w+@\\w+\\.\\w{2,}");

  if (!email) {
    result = "Email required";
  } else if (!re.test(email)) {
    result = "Valid email required";
  }

  return result;
}

function confirmSubscription(email) {
  const confirmContainer = document.createElement("div");
  const confirmHeading = document.createElement("h2");
  const confirmParagraph = document.createElement("p");
  const dismissButton = document.createElement("button");
  const overlay = document.createElement("div");

  confirmHeading.textContent = "Thanks for subscribing!";
  confirmParagraph.innerHTML = `A confirmation email has been sent to <span class="bold">${email}</span>. Please open it and click the button inside to confirm your subscription.`;
  dismissButton.textContent = "Dismiss message";
  dismissButton.type = "submit";
  overlay.classList.add("overlay");
  
  dismissButton.addEventListener("click", () => {
    emailForm.children[0].children[1].value = "";
    
    document.body.removeChild(confirmContainer);
    document.body.removeChild(overlay);
  })

  confirmContainer.classList.add("confirm-wrapper");
  confirmContainer.appendChild(confirmHeading);
  confirmContainer.appendChild(confirmParagraph);
  confirmContainer.appendChild(dismissButton);

  document.body.appendChild(confirmContainer);
  document.body.appendChild(overlay);
}

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailLabel = emailForm.children[0].children[0];
  const emailLabelErrorSpan = emailLabel.children[0];
  const emailInput = emailForm.children[0].children[1];
  const result = validateEmail(emailInput.value);

  if (result) {
    emailInput.classList.add("email-input-error");

    if  (emailLabelErrorSpan) {
      emailLabel.removeChild(emailLabelErrorSpan);
    }

    const newLabelErrorSpan = document.createElement("span");
    newLabelErrorSpan.textContent = result;
    newLabelErrorSpan.classList.add("email-input-error-message");

    emailLabel.appendChild(newLabelErrorSpan);
  } else {
    if  (emailLabelErrorSpan) {
      emailLabel.removeChild(emailLabelErrorSpan);
    }

    emailInput.classList.remove("email-input-error");

    confirmSubscription(emailInput.value);
  }

})