// This script will handle the button click in the popup

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('modifyButton');
  button.addEventListener('click', function() {
      var imageUrl = document.getElementById('imageUrl').value;
      // Validate the URL (basic check)
      if (imageUrl) {
          // Get the active tab
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              if (tabs && tabs.length > 0) {
                  // Send a message to the content script with the image URL
                  chrome.tabs.sendMessage(tabs[0].id, { action: "replaceProfilePictures", url: imageUrl }, function(response) {
                      if (chrome.runtime.lastError) {
                          console.error(chrome.runtime.lastError.message);
                      } else {
                          console.log('Message sent successfully');
                      }
                  });
              } else {
                  console.error('No active tab found');
              }
          });
      } else {
          alert('Please enter a valid image URL');
      }
  });
});
