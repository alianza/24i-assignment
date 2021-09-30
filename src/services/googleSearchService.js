// import testDataImage from 'cypress/fixtures/testDataImage.json'
// import testDataWeb from 'cypress/fixtures/testDataWeb.json'

let apiKey = 'AIzaSyDLfvMG_HiopNqKzO5Pvgk5VD5737qPOXE';
let searchEngineId = '21f08f22c3bb24f4d';

let paginationFragment = '&start=';

const GoogleSearchService = {
    baseUrl: `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=`,

    doLoad(url) { // Base method for doing http GET requests
        if (!url.includes(this.baseUrl)) { url = this.baseUrl + url }

        return fetch(url).then(response => {
            if (response.status === 404) { return '' }
            if (response.status === 200) { return response.json() }})
            .then(data => {
                return data;
            }).catch(e => { console.log(`Error performing API call to ${url}`, e) })
    },

    doWebSearch(query, index) { // Performs a search operation with web results
        const pagination = index ? `${paginationFragment}${index}` : '';
        return this.doLoad(query + pagination).then(jsonData => {
            return jsonData;
            // return testDataWeb; // Test implementation to save API calls
        }).catch(e => { console.log('Error retrieving web results', e) })
    },

    doImageSearch(query, index) { // Performs a search operation with image results
        const pagination = index ? `${paginationFragment}${index}` : '';
        return this.doLoad(`${query}&searchType=image${pagination}`).then(jsonData => {
            return jsonData;
            // return testDataImage; // Test implementation to save API calls
        }).catch(e => { console.log('Error retrieving image results', e) })
    }
}

export default GoogleSearchService;
