 // Recieve messages from popup.js then invoke addListener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if message has "downloadText" to trigger download 
    if (message.action === "downloadText") {
      // Extract filename from message, suffix .conf does not work for some reason
      const filename = message.filename || "user_input.conf"; 
      // Extract data from message object, i.e the file
      const text = message.text;
      // Create blob from extracted message to be able to create URL for download
      const blob = new Blob([text], { type: 'text/plain' }); 
      // Create download URL
      const url = URL.createObjectURL(blob);
      // Start download and set filename
      chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      });
    }
  });