const buttonId = "switch";
let activeState = true;

let toggleButton = document.getElementById(buttonId);

toggleButton.addEventListener("click", async () => {
  activeState = !activeState;
});
