import "./style/styles.css";
import "./style/styles.scss";
import "./style/base.css";

import GoogleSearchService from "./services/googleSearchService";
import { hideLoader, showLoader } from "./lib/loader";

import logoImg from "./assets/images/google.svg";
import { scrollIntoView } from "./lib/scroll";

// Elements

const searchButton = document.getElementById('searchButton');
const searchField = document.getElementById('searchField');
const imageResults = document.getElementById('imageResults');
const webResults = document.getElementById('webResults');
const logo = document.getElementById('logo');
const loadMoreImagesButton = document.getElementById('loadMoreImages');
const loadMoreWebButton = document.getElementById('loadMoreWeb');
const numberOfWebResults = document.getElementById('numberOfWebResults');
const webResultsTime = document.getElementById('webResultsTime');
const numberOfImageResults = document.getElementById('numberOfImageResults');
const imageResultsTime = document.getElementById('imageResultsTime');

// Init

init();

// Methods

function init() {
    logo.src = logoImg;

    searchButton.addEventListener('click', performSearch);

    loadMoreWebButton.addEventListener('click', loadNextWebResults);
    loadMoreImagesButton.addEventListener('click', loadNextImageResults);

    searchField.addEventListener('keyup', e => {
        if (e.key === 'Enter' || e.keyCode === 13) { performSearch(); }
    });

    performSearch();
}


function performSearch() {
    showLoader();
    clearSearchResults();

    const searchQuery = searchField.value;

    if (searchQuery) {
        performWebSearch(searchQuery, '');
        performImageSearch(searchQuery, '');
    }
}

function loadNextWebResults(e) {
    showLoader();
    const index = parseInt(e.target.dataset.index) + 1;
    performWebSearch(searchField.value, index);
}

function loadNextImageResults(e) {
    showLoader();
    const index = parseInt(e.target.dataset.index) + 1;
    performImageSearch(searchField.value, index);
}

function performWebSearch(query, fromIndex) {
    GoogleSearchService.doWebSearch(query, fromIndex).then(results => {
        // console.log('web', results);

        // console.log(results.items);

        loadMoreWebButton.dataset.index = results.queries.request[0].count + results.queries.request[0].startIndex;

        numberOfWebResults.innerText = `Results: ${results.searchInformation.totalResults}`
        webResultsTime.innerText = `Time: ${results.searchInformation.formattedSearchTime}s`

        results.items.forEach((item, index, array) => {
            webResults.insertAdjacentHTML('beforeend',
                `
                    <div class="relative mb-2 last:mb-0">
                        <a href="${item.link}" target="_blank" class="block">${item.htmlTitle || item.title}</a>
                        <span class="block text-forest">${item.displayLink}</span>
                        <span>${item.htmlSnippet || item.snippet}</span>
                    </div>
                    `);
            if (index === array.length - 1) { hideLoader(); if (fromIndex) { scrollIntoView(loadMoreWebButton) } } // If: last item, If pagination is used
        });
    });
}

function performImageSearch(searchQuery, fromIndex) {
    GoogleSearchService.doImageSearch(searchQuery, fromIndex).then(results => {
        // console.log('image', results);

        // console.log(results.items);

        loadMoreImagesButton.dataset.index = results.queries.request[0].count + results.queries.request[0].startIndex;

        numberOfImageResults.innerText = `Results: ${results.searchInformation.totalResults}`
        imageResultsTime.innerText = `Time: ${results.searchInformation.formattedSearchTime}s`

        results.items.forEach((item, index, array) => {
            imageResults.insertAdjacentHTML('beforeend',
                `
                    <a href="${item.link}" target="_blank" class="relative" style="height: fit-content">
                        <img class="w-full rounded" src="${item.image.thumbnailLink}" alt="${item.image.contextLink}">
                        <div class="absolute bottom-0 left-0 leading-4 h-4 overflow-ellipsis whitespace-nowrap w-full overflow-hidden bg-black text-sm rounded-b text-primary">${item.htmlTitle || item.title}</div>
                    </a>
                    `);
            if (index === array.length - 1) { hideLoader(); if (fromIndex) { scrollIntoView(loadMoreImagesButton) } } // If: last item, If pagination is used
        });
    });
}

function clearSearchResults() {
    imageResults.innerHTML = '';
    webResults.innerHTML = '';
}
