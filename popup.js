document.getElementById("checkBtn").addEventListener("click", () => {
    let text = document.getElementById("textInput").value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "checkGrammar", text: text }, (response) => {
        if (response && response.correctedText) {
          document.getElementById("result").innerText = response.correctedText;
        } else if (response && response.error) {
          document.getElementById("result").innerText = "Error: " + response.error;
        } else {
          document.getElementById("result").innerText = "Error: Could not retrieve corrected text.";
        }
      });
    });
  });
  