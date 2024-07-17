  function checkGrammar(text, callback) {
    fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-None-XKjKVvG58VdcbzB3C6MaT3BlbkFJU6PJtjUl797cDFD4yQWr"  // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        prompt: `Correct the grammar of the following text:\n\n${text}\n\nCorrected Text:`,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.5
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.choices && data.choices.length > 0) {
        const correctedText = data.choices[0].text.trim();
        callback({ correctedText: correctedText });
      } else {
        callback({ error: "No corrected text found" });
      }
    })
    .catch(error => {
      console.error("Error:", error);
      callback({ error: error.message });
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkGrammar") {
      checkGrammar(request.text, (response) => {
        sendResponse(response);
      });
      return true;
    }
  });
  