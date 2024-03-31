const textInput = document.getElementById("textInput");

// Function to adjust the height of the textarea dynamically
function adjustTextareaHeight() {
    textInput.style.height = "auto";
    textInput.style.height = (textInput.scrollHeight) + "px";
}

// Event listener to adjust the textarea height when the user types
textInput.addEventListener("input", adjustTextareaHeight);

// Initially adjust the textarea height
adjustTextareaHeight();

// Do when html is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get text from textbox with id textInput/filenameinput
    const filenameInput = document.getElementById('filenameInput');
    const textInput = document.getElementById('textInput');
    // Submit button
    const submitButton = document.getElementById('submitButton');
    // On click get value from boxes and send to background script which includes 3 objects(data from the boxes)
    submitButton.addEventListener('click', function() {
      const text = textInput.value;
      const filename = (filenameInput.value) ; 
      chrome.runtime.sendMessage({ action: "downloadText", text: text, filename: filename });
    });
  });