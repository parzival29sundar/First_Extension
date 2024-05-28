
console.log('Content script loaded');

// Function to replace profile pictures
function replaceProfilePictures(imageUrl) {
    console.log('Replacing profile pictures with:', imageUrl);

    // All the profile pictures will be selected with this
    const profilePictures = document.querySelectorAll('.feed-shared-actor__container img, .update-components-actor__container img, .ivm-image-view-model__avatar-img');

    // This will tell us the number of all the profile pictures that got selected and which has to be replaced
    console.log('Number of profile pictures found:', profilePictures.length);

    // Replacing with an image URL
    profilePictures.forEach(picture => {
        // Log the current image src
        console.log('Old Image URL:', picture.src);

        // Replace the src attribute with the URL of the specified image
        picture.setAttribute('src', imageUrl);
        // Optionally, you can set width and height to maintain the layout
        picture.setAttribute('width', picture.getAttribute('width'));
        picture.setAttribute('height', picture.getAttribute('height'));

        
        console.log('New Image URL Set:', picture.src);
    });
}

// To replace more profile picture which comes after scrolling down
function handleScroll(imageUrl) {
   
    window.addEventListener('scroll', function() {
       
        replaceProfilePictures(imageUrl);
    });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replaceProfilePictures") {
        replaceProfilePictures(request.url);
        
        handleScroll(request.url);
    }
});
