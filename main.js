const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader")

// Return a Random number from 1 to 17 !
function getRandomNum() {
    let num = Math.floor(Math.random() * 18);
    if (num == 0) {
        return num + 1;
    } else {
        return num;
    }
}

let ready = false;
const count = 30;
let current_page = getRandomNum();
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// PixaBay API
const apiKey = '21141532-17c25269387815a5aefe98d63';

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
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements For link & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('Total images', totalImages);
    // Run Function for each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unplash
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.pageURL,
            'target': '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.webformatURL,
            'alt': photo.tags,
            'title': photo.tags
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
        const apiUrl = `https://pixabay.com/api/?key=${apiKey}&per_page=${count}&page=${current_page}`
        const response = await fetch(apiUrl);
        data = await response.json();
        photosArray = data["hits"];
        current_page = getRandomNum();
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
        loader.removeAttribute('hidden');
        getPhotos();
        // console.log('load more ...');
    }
});


// On Load
getPhotos();

