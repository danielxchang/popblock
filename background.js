const DEFAULT_STATE = false;
const SHORTCUT_CMD = "toggle_btn";

// Active State
const getActiveState = (callbackFn) => {
  chrome.storage.sync.get(["active"], function (result) {
    callbackFn(result.active);
  });
};

const setActiveState = (state) => {
  chrome.storage.sync.set({ active: state });
};

const toggleActiveState = () => {
  getActiveState((oldState) => {
    const newState = !oldState;
    setActiveState(newState);
  });
};

// Closes any popups if extension is activated
const closePopup = (tab) => {
  chrome.storage.sync.get(["active"], function (result) {
    if (result.active) {
      chrome.tabs.remove(tab.id);
      console.log("CLOSED TAB");
    }
  });
};

// Event Listeners
chrome.runtime.onInstalled.addListener(async () => {
  setActiveState(DEFAULT_STATE);
});

chrome.tabs.onCreated.addListener(closePopup);

chrome.commands.onCommand.addListener((command) => {
  if (command === SHORTCUT_CMD) toggleActiveState();
});
