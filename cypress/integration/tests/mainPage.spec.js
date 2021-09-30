describe('The Main page', () => {
    beforeEach(() => {
        cy.visit('/') // Uses baseUrl: 'http://localhost:3000' Run project with `yarn run build` & `yarn run start`
    })

    it('successfully loads', () => {
        console.log('Loaded base url');
    })
})
