describe('Check data fields test', function () {

    beforeEach(() => {
        cy.visit('http://qalab.pl.tivixlabs.com/')
    });

    it('Check correct date', () => {
        cy.get('#pickup')
            .type('2022-07-01');
        cy.get('#dropoff')
            .type('2022-07-02');
        cy.get('.btn')
            .click();
        cy.get('#search-results')
            .should('be.visible');
    });

    it('Check if data fields can be empty', () => {
        //check when all fields are empty
        cy.get('#pickup')
            .clear();
        cy.get('#dropoff')
            .clear();
        cy.get('.btn')
            .click();
        cy.get('.alert')
            .contains('Please fill pickup and drop off dates')
            .should('be.visible');

        //check when dropoff is empty
        cy.get('#pickup')
            .type('2022-01-01');
        cy.get('.btn')
            .click();
        cy.get('.alert')
            .contains('Please fill pickup and drop off dates')
            .should('be.visible');

        //check when pickup is empty
        cy.get('#pickup')
            .clear();
        cy.get('#dropoff')
            .type('2022-01-01');
        cy.get('.alert')
            .contains('Please fill pickup and drop off dates')
            .should('be.visible');
    });

    it('Check if dropoff date could be before pickup date', () => {
        cy.get('#pickup')
            .type('2022-07-01');
        cy.get('#dropoff')
            .type('2021-07-01');
        cy.get('.btn')
            .click();
        cy.get('.alert')
            .contains('Please enter a valid date!')
            .should('be.visible');
    });

    it('Check past date', () => {
            cy.get('#pickup')
                .type('2021-05-11');
            cy.get('#dropoff')
                .type('2021-05-11');
            cy.get('.btn')
                .click();
            cy.get('#search-results')
                .should('not.be.visible');
        });
});