const searchTerm = 'car';

describe('The search function', () => {
    beforeEach(() => {
        cy.visit('/') // Uses baseUrl defined in cypress.json config file, run project locally with `build-prod`& `serve`
    });

    it('Has initial search', () => {
        // Asserts initial search results
        console.log('Loaded base url');

        cy.get('#imageResults').children().should('have.length', 10);
        cy.get('#webResults').children().should('have.length', 10);
    });

    it('Can perform new search', () => {
        // Asserts new search request can be performed
        console.log('Loaded base url');

        cy.findByPlaceholderText('What are you looking for? 👀').clear().type(searchTerm + '{enter}');

        cy.get('#imageResults').children().should('have.length', 10);
        cy.get('#webResults').children().should('have.length', 10);
    });

    it('Can load more web results', () => {
        // Asserts that more web search request can be loaded
        console.log('Loaded base url');

        cy.get('#loadMoreWeb').scrollIntoView().click();

        cy.get('#webResults').children().should('have.length', 20);
    });

    it('Can load more image results', () => {
        // Asserts that more image search request can be loaded
        console.log('Loaded base url');

        cy.get('#loadMoreImages').scrollIntoView().click();

        cy.get('#imageResults').children().should('have.length', 20);
    });
});
