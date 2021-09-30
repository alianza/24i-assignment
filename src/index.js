import "./style/styles.css";
import "./style/styles.scss";
import "./style/base.css";

import GoogleSearchService from "./services/googleSearchService";
import { hideLoader, showLoader } from "./lib/loader";

import logoImg from "./assets/images/google.svg";
import { scrollIntoView, scrollToTop } from "./lib/scroll";

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
const scrollToTopButton = document.getElementById('scrollToTopButton');

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

    document.body.addEventListener('click', clickOutSide);

    window.onscroll = () => { scrollToTopButton.style.visibility = document.documentElement.scrollTop > 650 ? "visible" : "hidden" };

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

        loadMoreWebButton.dataset.index = results.queries.request[0].count + results.queries.request[0].startIndex;

        numberOfWebResults.innerText = `Results: ${results.searchInformation.totalResults}`
        webResultsTime.innerText = `Time: ${results.searchInformation.formattedSearchTime}s`

        results.items.forEach((item, index, array) => {
            webResults.insertAdjacentHTML('beforeend',
                `
                    <div class="webResult relative mb-2 bg-accent-1 p-4 rounded-md last:mb-0" onclick="highLightCurrentWebResult(this)">
                        <a href="${item.link}" target="_blank" class="block no-underline hover:underline">${item.htmlTitle || item.title}</a>
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

        loadMoreImagesButton.dataset.index = results.queries.request[0].count + results.queries.request[0].startIndex;

        numberOfImageResults.innerText = `Results: ${results.searchInformation.totalResults}`
        imageResultsTime.innerText = `Time: ${results.searchInformation.formattedSearchTime}s`

        results.items.forEach((item, index, array) => {
            imageResults.insertAdjacentHTML('beforeend',
                `
                    <a href="${item.link}" target="_blank" class="imageResult relative pb-4 rounded ring-opacity-80 hover:ring-4 active:outline-none active:ring-2" style="height: fit-content">
                        <img class="max-w-full rounded-t" src="${item.image.thumbnailLink}" alt="${item.image.displayLink}">
                        <span title="${item.title}" onclick="event.preventDefault(); window.open('${item.image.contextLink}', '_blank')" 
                        class="absolute left-0 leading-4 h-4 overflow-ellipsis whitespace-nowrap w-full overflow-hidden 
                        bg-black text-sm text-primary indent-1 pr-1 hover:underline rounded-b">${item.htmlTitle || item.title}</span>
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

function clickOutSide(e) {
    const webResults = document.querySelectorAll("div.webResult.ring-2");
    let targetElement = e.target; // clicked element

    do {
        for (let e of webResults) {
            if (e === targetElement) {
                return; // This is a click inside of any of the target elements.
            }
        }

        targetElement = targetElement.parentNode;
    } while (targetElement);

    unHighlightWebResults(); // This is a click outside of any of the target elements.
}

function unHighlightWebResults() {
    document.querySelectorAll('div.webResult').forEach(e => {
        e.classList.remove('ring-2');
    });
}

window.highLightCurrentWebResult = function(e) {
    unHighlightWebResults();
    e.classList.add('ring-2');
}

window.goToTop = function () {
    scrollToTop();
}
