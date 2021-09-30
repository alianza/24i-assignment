describe('The user interface', () => {
    beforeEach(() => {
        cy.visit('/') // Uses baseUrl defined in cypress.json config file, run project locally with `build-prod`& `serve`
    });

    it('Has scroll to top button', () => {
        // Scrolls to bottom to make scrollToTop button appear, presses the button and asserts page scrolled up to top
        console.log('Loaded base url');

        cy.scrollTo('bottom');
        cy.findAllByText('↑').click();
        cy.window().then(win => {
            expect(win.window.screenTop).to.equal(0);
        });
    });
});
