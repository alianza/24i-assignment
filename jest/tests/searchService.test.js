import GoogleSearchService from "../../src/services/googleSearchService";

describe('The Google custom search service', () => {


    test('googleSearchService web search', async () => {

        const query = 'car';
        const fromIndex = null;

        await GoogleSearchService.doWebSearch(query, fromIndex).then(results => {

            const index = results.queries.request[0].count + results.queries.request[0].startIndex;

            const title = results.queries.request[0].title

            const searchTerm = title.substr(title.indexOf('-') + 2, title.length);

            const resultsAmount = results.searchInformation.totalResults;

            const time = results.searchInformation.formattedSearchTime;

            expect(searchTerm).toEqual(query);
            expect(time).toBeDefined();
            expect(index).toBe(11);
            expect(parseInt(resultsAmount)).toBeGreaterThanOrEqual(1);
            expect(results.items.length).toBeGreaterThanOrEqual(1);
        });

    });

    test('googleSearchService image search', async () => {

        const query = 'car';
        const fromIndex = null;

        await GoogleSearchService.doImageSearch(query, fromIndex).then(results => {

            const index = results.queries.request[0].count + results.queries.request[0].startIndex;

            const title = results.queries.request[0].title

            const searchTerm = title.substr(title.indexOf('-') + 2, title.length);

            const searchType = results.queries.request[0].searchType

            const resultsAmount = results.searchInformation.totalResults;

            const time = results.searchInformation.formattedSearchTime;

            expect(searchTerm).toEqual(query);
            expect(searchType).toBe("image");
            expect(time).toBeDefined();
            expect(index).toBe(11);
            expect(parseInt(resultsAmount)).toBeGreaterThanOrEqual(1);
            expect(results.items.length).toBeGreaterThanOrEqual(1);
        });
    });

});
