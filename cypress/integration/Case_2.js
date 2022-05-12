describe('Rent a car in Wroclaw, Poland', function () {

    let country = 1,
    city = 1,
    pickupdate = '2022-07-02',
    dropoffdate = '2022-07-02';

    before(() => {
        cy.fixture('tsconfig').then((usedData) => {
            this.usedData = usedData
        });
        cy.visit('http://qalab.pl.tivixlabs.com/')
    });

    it('Check correct date', () => {
        //search vechicle
        cy.get('#country')
            .select(country);
        cy.get('#city')
            .select(city);
        cy.get('#pickup')
            .type(pickupdate);
        cy.get('#dropoff')
            .type(dropoffdate);
        cy.get('.btn')
            .click();
        cy.get('#search-results')
            .should('be.visible');
        cy.get(':nth-child(1) > :nth-child(7) > .btn')
            .click();

        //confirm your selection and enter the ordering party's details
        cy.get('.card')
            .should('be.visible');
        cy.get('.btn')
            .click();
        cy.get('#name')
            .type(this.usedData.userName);
        cy.get('#last_name')
            .type(this.usedData.userLastName);
        cy.get('#card_number')
            .type(this.usedData.userCardNumber);
        cy.get('#email')
            .type(this.usedData.userEmail);
        cy.get('.btn')
            .click();

        //I assume this part, I failed to complete the process every tyme
        cy.get('.info')
            .should('be.visible');
    });
});