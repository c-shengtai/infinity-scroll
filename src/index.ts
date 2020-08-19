import { setAttributes } from './Helper';
import { loader, imgContainer } from './DomElement';
import { fetchPhotos, Photo } from './Unsplash';

const displayPhotos = (count: number): void => {
    fetchPhotos<Photo[]>(count)
        .then((photos) => {
            photos.forEach((photo) => {
                // create <a>
                const a = document.createElement('a');
                setAttributes(a, {
                    href: photo.links.html,
                    alt: photo.description,
                });
                // create <img>
                const img = document.createElement('img');
                setAttributes(img, {
                    src: photo.urls.regular,
                    title: photo.description,
                    alt: photo.description,
                });
                // img inside <a>
                a.appendChild(img);
                // both inside container
                imgContainer.appendChild(a);
                loader.hidden = true;
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

displayPhotos(5);

// when user scroll
window.addEventListener('scroll', (): void => {
    if (
        window.scrollY + window.innerHeight >=
        document.body.offsetHeight - 1000
    ) {
        displayPhotos(30);
    }
});
