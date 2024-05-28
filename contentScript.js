// This script will be injected into the LinkedIn homepage
console.log('Content script loaded');

// Function to replace profile pictures
function replaceProfilePictures(imageUrl) {
    console.log('Replacing profile pictures with:', imageUrl);
    // Select all profile picture elements in posts
    const profilePictures = document.querySelectorAll('.feed-shared-actor__container img, .update-components-actor__container img, .ivm-image-view-model__avatar-img');

    // Log the number of profile pictures selected
    console.log('Number of profile pictures found:', profilePictures.length);

    // Replace each profile picture with the specified image
    profilePictures.forEach(picture => {
        // Log the current image src
        console.log('Old Image URL:', picture.src);

        // Replace the src attribute with the URL of the specified image
        picture.setAttribute('src', imageUrl);
        // Optionally, you can set width and height to maintain the layout
        picture.setAttribute('width', picture.getAttribute('width'));
        picture.setAttribute('height', picture.getAttribute('height'));

        // Log the new image src to verify the change
        console.log('New Image URL Set:', picture.src);
    });
}

// Function to handle scroll events and replace profile pictures dynamically
function handleScroll(imageUrl) {
    // Replace profile pictures when the page is scrolled
    window.addEventListener('scroll', function() {
        // Call replaceProfilePictures() whenever the user scrolls
        replaceProfilePictures(imageUrl);
    });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replaceProfilePictures") {
        replaceProfilePictures(request.url);
        // Handle scroll events to dynamically replace profile pictures
        handleScroll(request.url);
    }
});
