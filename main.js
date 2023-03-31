import anime from "animejs/lib/anime.es.js";
import inView from "in-view";
// import "./src/js/tilt.js";
// import "./src/js/index";
import "./src/css/actors.css";
import "./src/css/style.css";
import "./src/css/a-tachyons.css";
import "./src/css/basscss-grid.css";
import "./src/css/base.css";
import "./src/css/fonts.css";
import "./src/css/header.css";
import "./src/css/speakers.css";
import "./src/css/scroller.css";
import "./src/css/reel.css";
import "./src/css/contact.css";

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

// // 1. when we click the .register-button, run a function
// // 2. grab the .front element and add a class of .slide-up
// const registerButton = document.querySelector(".register-button");
// registerButton.addEventListener("click", (event) => {
//   // stops any default actions from happening
//   event.preventDefault();
//   const frontEl = document.querySelector(".front");
//   frontEl.classList.add("slide-up");
// });

// //js video control behavior

(function () {
  "use strict";

  var bodyEl = document.body,
    videoWrap = document.querySelector(".video-wrap"),
    videoEl = videoWrap.querySelector("video"),
    playCtrl = document.querySelector(".action--play"),
    closeCtrl = document.querySelector(".action--close");

  function init() {
    initEvents();
  }

  function initEvents() {
    console.log("Hello2");
    playCtrl.addEventListener("click", play);
    closeCtrl.addEventListener("click", hide);
    videoEl.addEventListener("canplay", allowPlay);
    videoEl.addEventListener("ended", hide);
  }

  function allowPlay() {
    console.log("Hello");
    bodyEl.classList.add("video-loaded");
  }

  function play() {
    videoEl.currentTime = 0;
    videoWrap.classList.remove("video-wrap--hide");

    videoWrap.classList.add("video-wrap--show");
    setTimeout(function () {
      videoEl.play();
    }, 600);
  }

  function hide() {
    videoWrap.classList.remove("video-wrap--show");
    videoWrap.classList.add("video-wrap--hide");
    videoEl.pause();
  }

  init();
})();

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
