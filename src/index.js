import '../styles/style.scss';

class Cat {
    constructor() {
        this.apiBreedUrl = 'https://api.thecatapi.com/v1/images/search?breed_ids';
        this.apiAllBreedsUrl = "https://api.thecatapi.com/v1/breeds";
        this.imgEl = document.querySelector('.cat-breed img');
        this.backgroundEl = document.querySelector('.cat-breed__background');
        this.description = document.querySelector('.cat-breed__description p');
        this.wikiUrl = document.querySelector('.cat-breed__description a');
        this.titleName = document.querySelector('.container span')
        this.tilesEl = document.querySelector('.tiles');
        this.spinnerEl = document.querySelector('.spinner');

        this.init();
    }

    showLoading() {
        this.spinnerEl.classList.add('spinner--visible');
    }

    hideLoading() {
        this.spinnerEl.classList.remove('spinner--visible');
    }

    listBreeds() {
        return fetch(this.apiAllBreedsUrl)
            .then(resp => resp.json())
    }

    getFirstImage() {
        return fetch(`${this.apiBreedUrl}=beng`)
            .then(resp => resp.json())
            .then(data => data[0].url);
    }

    getCatName() {
        return fetch(`${this.apiBreedUrl}=beng`)
            .then(resp => resp.json())
            .then(data => data[0].breeds[0].name);
    }

    getCatDescrition() {
        return fetch(`${this.apiBreedUrl}=beng`)
            .then(resp => resp.json())
            .then(data => data[0].breeds[0].description);
    }

    getWikiUrl() {
        return fetch(`${this.apiBreedUrl}=beng`)
            .then(resp => resp.json())
            .then(data => data[0].breeds[0].wikipedia_url);
    }

    loadCatName(name) {
        this.titleName.textContent = name;
    }

    loadCatDescription(description) {
        this.description.textContent = description;
    }

    loadWikiUrl(wikiUrl) {
        this.wikiUrl.setAttribute("href", wikiUrl);
    }

    getImageById(breedId) {
        return fetch(`${this.apiBreedUrl}=${breedId}`)
            .then(resp => resp.json())
            .then(data => data[0].url);
    }

    showImage(image) {
        this.imgEl.setAttribute('src', image);
        this.backgroundEl.style.background = `url("${image}")`;
        this.hideLoading();
    }

    init() {
        this.showLoading();
        this.getFirstImage()
            .then(img => this.showImage(img));
        this.getCatName().then(name => this.loadCatName(name));
        this.getCatDescrition().then(descr => this.loadCatDescription(descr));
        this.getWikiUrl().then(wUrl => this.loadWikiUrl(wUrl));
        this.showAllBreeds();
    }

    addBreed(name, id, descr, wikiUrl) {
        const tile = document.createElement('div');
        tile.classList.add('tiles__tile');

        tile.innerText = name;
        tile.addEventListener('click', () => {
            window.scrollTo(0, 0);
            this.showLoading();
            this.getImageById(id)
                .then(img => this.showImage(img));
            this.loadCatName(name);
            this.loadCatDescription(descr);
            this.loadWikiUrl(wikiUrl);
        });

        this.tilesEl.appendChild(tile);
    }

    showAllBreeds() {
        this.listBreeds()
            .then(breeds => {
                for (let i = 0; i < breeds.length; i++) {
                    const name = breeds[i].name;
                    const id = breeds[i].id;
                    const descr = breeds[i].description;
                    const wikiUrl = breeds[i].wikipedia_url;
                    this.addBreed(name, id, descr, wikiUrl);
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Cat();
});