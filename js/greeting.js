const greetingForm = document.querySelector(".set-name");
const greetingInput = document.querySelector("#greeting-input");
const greetingSubmit = document.querySelector("#greeting-submit");
const greetingText = document.querySelector("#greeting-name");
const greetings = document.querySelector(".greetings");
const header = document.querySelector("header");
const main = document.querySelector("main");

window.onload = function () {
  const userName = localStorage.getItem("userName");

  if (userName !== null) {
    greetingText.innerText = "Hello! " + userName;
    greetings.classList.remove("greetings");
    greetings.classList.add("disappear");
    greetingText.classList.remove("hidden");
    greetingText.classList.add("appear-first");
    header.classList.remove("hidden");
    header.classList.add("appear-second");
    main.classList.remove("hidden");
    main.classList.add("appear-second");
  }
};

function onSubmit(e) {
  e.preventDefault();
  const nameValue = greetingInput.value;

  localStorage.setItem("userName", nameValue);

  const name = localStorage.getItem("userName");
  greetingText.innerText = "Hello! " + name;

  greetings.classList.remove("greetings");
  greetings.classList.add("disappear");
  greetingText.classList.remove("hidden");
  greetingText.classList.add("appear-first");
  header.classList.remove("hidden");
  header.classList.add("appear-second");
  main.classList.remove("hidden");
  main.classList.add("appear-second");
}

greetingForm.addEventListener("submit", onSubmit);
