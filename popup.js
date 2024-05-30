// // TO handle the button functionality

// document.addEventListener('DOMContentLoaded', function() {
//   var button = document.getElementById('modifyButton');
//   button.addEventListener('click', function() {
//       var imageUrl = document.getElementById('imageUrl').value;
//       // we are checking the URL if it isnt  0
//       if (imageUrl) {
//           // Get the active tab
//           chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//               if (tabs && tabs.length > 0) {
                  
//                   chrome.tabs.sendMessage(tabs[0].id, { action: "replaceProfilePictures", url: imageUrl }, function(response) {
//                       if (chrome.runtime.lastError) {
//                           console.error(chrome.runtime.lastError.message);
//                       } else {
//                           console.log('Message sent successfully');
//                       }
//                   });
//               } else {
//                   console.error('No active tab found');
//               }
//           });
//       } else {
//           alert('Please enter a valid image URL');
//       }
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
    var imageUrlInput = document.getElementById('imageUrl');
    var imagePreview = document.getElementById('imagePreview');
    var modifyButton = document.getElementById('modifyButton');

    // Update the image preview when the URL input changes
    imageUrlInput.addEventListener('input', function() {
        var url = imageUrlInput.value;
        if (url) {
            imagePreview.src = url;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // Handle the button click to modify profile pictures
    modifyButton.addEventListener('click', function() {
        var imageUrl = imageUrlInput.value;
        if (imageUrl) {
            // Get the active tab
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs && tabs.length > 0) {
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
