// import testDataImage from './testDataImage.json'
// import testDataWeb from './testDataWeb.json'

let apiKey = 'AIzaSyDLfvMG_HiopNqKzO5Pvgk5VD5737qPOXE';
let searchEngineId = '21f08f22c3bb24f4d';

let paginationFragment = '&start=';

const GoogleSearchService = {
    baseUrl: `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=`,

    doLoad(query) { // Base method for doing http Get requests
        if (!query.includes(this.baseUrl)) { query = this.baseUrl + query }

        console.log(query)
        return fetch(query).then(response => {
            if (response.status === 404) { return '' }
            if (response.status === 200) { return response.json() }})
            .then(data => {
                // console.log(data)
                return data}).catch(e => { console.log('Error', e) })

        // return Promise.resolve()
    },

    doWebSearch(query, index) {
        const pagination = index ? `${paginationFragment}${index}` : '';
        return this.doLoad(query + pagination).then(jsonData => {
            return jsonData;
            // return testDataWeb;
        }).catch(e => { console.log('Error', e) })
    },

    doImageSearch(query, index) {
        const pagination = index ? `${paginationFragment}${index}` : '';
        return this.doLoad(`${query}&searchType=image${pagination}`).then(jsonData => {
            return jsonData;
            // return testDataImage;
        }).catch(e => { console.log('Error', e) })
    }
}

export default GoogleSearchService;
