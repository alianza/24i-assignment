import GoogleSearchService from "../services/googleSearchService";
import { hideLoader } from "./loader";
import { scrollIntoView } from "./scroll";

const numberOfWebResults = document.getElementById('numberOfWebResults');
const webResultsTime = document.getElementById('webResultsTime');
const numberOfImageResults = document.getElementById('numberOfImageResults');
const imageResultsTime = document.getElementById('imageResultsTime');

const loadMoreImagesButton = document.getElementById('loadMoreImages');
const loadMoreWebButton = document.getElementById('loadMoreWeb');

const imageResults = document.getElementById('imageResults');
const webResults = document.getElementById('webResults');

export function performWebSearch(query, fromIndex) { // Performs web search query
    GoogleSearchService.doWebSearch(query, fromIndex).then(results => {

        loadMoreWebButton.dataset.index = results.queries.request[0].count + results.queries.request[0].startIndex;

        numberOfWebResults.innerText = `Results: ${results.searchInformation.totalResults}`
        webResultsTime.innerText = `Time: ${results.searchInformation.formattedSearchTime}s`

        results.items.forEach((item, index, array) => {
            webResults.insertAdjacentHTML('beforeend', // HTML fragment to append for every web result
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

export function performImageSearch(searchQuery, fromIndex) { // Performs image search query
    GoogleSearchService.doImageSearch(searchQuery, fromIndex).then(results => {

        loadMoreImagesButton.dataset.index = results.queries.request[0].count + results.queries.request[0].startIndex;

        numberOfImageResults.innerText = `Results: ${results.searchInformation.totalResults}`
        imageResultsTime.innerText = `Time: ${results.searchInformation.formattedSearchTime}s`

        results.items.forEach((item, index, array) => {
            imageResults.insertAdjacentHTML('beforeend', // HTML fragment to append for every image result
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
