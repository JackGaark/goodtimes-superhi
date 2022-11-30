// Grab our header and desktop header
// Insert the contents of our header into the document one
const header = document.querySelector(".header");
const desktopHeader = document.querySelector(".header-desktop");
desktopHeader.innerHTML = header.innerHTML;

// 1. When header enters th viewport, hide the desktop header (remove visible class)
// 2. When header leaves, show it (add the visible class)

inView(".header")
  .on("enter", (el) => desktopHeader.classList.remove("visible"))
  .on("exit", (el) => desktopHeader.classList.add("visible"));

// Enabling the tilt library on all our images
VanillaTilt.init(document.querySelectorAll(".image"), {
  max: 25,
  speed: 400,
});

inView(".fade")
  .on("enter", (img) => img.classList.add("visible"))
  .on("exit", (img) => img.classList.remove("visible"));

// WHen we click the register button, run a function
// 2. grab the .front element and add a class of .slide-up
const registerButton = document.querySelector(".register-button");
registerButton.addEventListener("click", (event) => {
  // Stops any default actions happening
  event.preventDefault();
  const frontEl = document.querySelector(".front");
  frontEl.classList.add("slide-up");
});

const prev = document.querySelector(".preview");
alert(prev);

const stripe = Stripe("pk_test_cucWEL0zZ0Ttl8sDgYcAdeD6");

// Set up Stripe.js and Elements to use in checkout form
const elements = stripe.elements();
const style = {
  base: {
    color: "#32325d",
    lineHeight: "18px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

const card = elements.create("card", { style: style });
card.mount("#card-element");

card.on("change", function (event) {
  const displayError = document.getElementById("card-errors");
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = "";
  }
});

// Handle form submission
const form = document.getElementById("payment-form");
const errorElement = document.getElementById("card-errors");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // here we lock the form
  form.classList.add("processing");
  stripe.createToken(card).then(function (result) {
    if (result.error) {
      // here we unlock the form again if there’s an error
      form.classList.remove("processing");
      // set the error text to the error message
      errorElement.textContent = result.error.message;
    } else {
      // now we take over to handle sending the token to our server
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  // here we handle and make our actual payment
  // 1. we are going to make a variable for our token, name and email
  const nameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  // 2. we are going to grab our form action url from the form
  const backendUrl = form.getAttribute("action");
  // 3. we’ll send the data off to the url using fetch

  fetch(backendUrl, {
    // we tell fetch to POST to our url vs GET
    method: "POST",
    // tell it we are sending across json data
    headers: {
      "Content-Type": "application/json",
    },
    // here we send the data across
    // 4. we also need to make sure the data is ready/secure to be sent over
    body: JSON.stringify({
      order: {
        stripe_token: token.id,
        // grab the value from the name element
        name: nameEl.value,
        // grab the value from the email element
        email: emailEl.value,
      },
    }),
  })
    // with fetch we get back a response which we turn into json
    .then((response) => response.json())
    // then we get it back as data which we can do stuff with
    .then((data) => {
      // here we check we actually get an order back, and then do something
      // with it if we have one
      if (data.order) {
        const order = data.order;
        // we are going to tell the user their payment was succesful
        form.querySelector(".form-title").textContent = "Payment successful!";
        form.querySelector(".form-fields").textContent = `
          Thank you ${order.name}, your payment was successful and we have sent an email receipt to ${order.email}
        `;
        form.classList.remove("processing");
      }
    })
    // if there’s an error, we can do something as well
    .catch((error) => {
      // tell the user there was an error
      errorElement.textContent = `There was an error with payment, please try again or contact us at help@goodtim.es`;
      form.classList.remove("processing");
    });
}

// grab all the anchor tags on the page
const anchors = document.querySelectorAll("a");
// loop over them
anchors.forEach((anchor) => {
  // listen for clicks on each one
  anchor.addEventListener("click", (event) => {
    // grab the href attribute
    const href = anchor.getAttribute("href");
    // if the href starts with a #
    if (href.charAt(0) === "#") {
      // stop the default action
      event.preventDefault();
      // find the element the href points to and scroll it into view
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
