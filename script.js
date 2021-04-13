const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader")

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 3;
const apiKey = 'CAIHQiGvfHTinkQ_YypMHPoFel7CEZcPoBK-asOTiZs';
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded += 1;
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
        // console.log("ready = ", ready);
    }
}

// Help Function to Set attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements For link & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('Total images', totalImages);
    // Run Function for each object in PhotosArray
    photosArray.forEach((photo)=> {
        // Create <a> to link to unplash
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        });
        // Event Listener, check when each is finished loading.
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
        console.log(error);
    }
}

// Check to see if scrolling near bottom of page, Load More photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        // console.log('load more ...');
    }
});


// On Load
getPhotos();