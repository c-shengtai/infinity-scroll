const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
// unsplash api
const count = 5;
const accessKey = 'IeKNM-LtK4rPl33O7KIsUWznAWDWx8PQHUMope2oEhg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

let photosArray = [];
let totalPhotos = 0;
let ready = false;
let loadImg = 0;

// set dom attributes
const setAttributes = (element, attributes) => {
    for (let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
};

const displayPhotos = () => {
    photosArray.forEach((photo) => {
        // create <a> link to unsplash
        const a = document.createElement('a');
        setAttributes(a, { href: photo.links.html, target: 'blank' });
        // create img
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            title: photo.description,
            alt: photo.description,
        });
        img.addEventListener('load', () => {
            loadImg += 1;
            if (loadImg === totalPhotos) {
                ready = true;
                loadImg = 0;
                loader.hidden = true;
            }
        });
        // img inside a
        a.appendChild(img);
        // both inside img container
        imgContainer.appendChild(a);
    });
};

// fetch photo from unsplash
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        const body = await response.json();
        photosArray = body;
        totalPhotos = photosArray.length;
        displayPhotos();
        count = 30;
    } catch (error) {
        console.log(error);
    }
};

getPhotos();

window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        ready
    ) {
        console.log('load more');
        getPhotos();
        ready = false;
    }
});
