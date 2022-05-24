const buttonId = "switch";

let toggleButton = document.getElementById(buttonId);

const updateButton = (isActive) => {
  if (isActive) toggleButton.setAttribute("checked", true);
  else toggleButton.removeAttribute("checked");
};

const getActiveState = (callbackFn) => {
  chrome.storage.sync.get(["active"], function (result) {
    callbackFn(result.active);
  });
};

const toggleActiveState = () => {
  getActiveState((oldState) => {
    const newState = !oldState;
    chrome.storage.sync.set({ active: newState });
    updateButton(newState);
  });
};

toggleButton.addEventListener("click", async () => {
  toggleActiveState();
});

getActiveState(updateButton);
