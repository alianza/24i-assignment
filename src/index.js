// Style

import "./style/styles.css";
import "./style/styles.scss";
import "./style/base.css";

// Modules

import { showLoader } from "./lib/loader";
import { scrollToTop } from "./lib/scroll";

// Assets

import logoImg from "./assets/images/google.svg";
import { performImageSearch, performWebSearch } from "./lib/search";

// Elements

const searchButton = document.getElementById('searchButton');
const searchField = document.getElementById('searchField');
const imageResults = document.getElementById('imageResults');
const webResults = document.getElementById('webResults');
const logo = document.getElementById('logo');
const loadMoreImagesButton = document.getElementById('loadMoreImages');
const loadMoreWebButton = document.getElementById('loadMoreWeb');
const scrollToTopButton = document.getElementById('scrollToTopButton');

// Init

init();

// Methods

function init() { // Initialisation method: Sets event listeners, image sources and performs initial search
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


function performSearch() { // Performs both image and web search
    showLoader();
    clearSearchResults();

    const searchQuery = searchField.value;

    if (searchQuery) {
        performWebSearch(searchQuery, '');
        performImageSearch(searchQuery, '');
    }
}

function loadNextWebResults(e) { // Loads the next page of web results
    showLoader();
    const index = parseInt(e.target.dataset.index) + 1;
    performWebSearch(searchField.value, index);
}

function loadNextImageResults(e) { // Loads the next page of image results
    showLoader();
    const index = parseInt(e.target.dataset.index) + 1;
    performImageSearch(searchField.value, index);
}

function clearSearchResults() { // Clears all search results
    imageResults.innerHTML = '';
    webResults.innerHTML = '';
}

function clickOutSide(e) { // Detects mouse click outside of supplied element
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

    unHighlightWebResults(); // This is a click outside of any of the target elements
}

function unHighlightWebResults() { // Removed highlighting from all web results
    document.querySelectorAll('div.webResult').forEach(e => {
        e.classList.remove('ring-2');
    });
}

window.highLightCurrentWebResult = function(e) { // Highlights the current web result
    unHighlightWebResults();
    e.classList.add('ring-2');
}

window.goToTop = function () { // Scrolls to the top of the page
    scrollToTop();
}
