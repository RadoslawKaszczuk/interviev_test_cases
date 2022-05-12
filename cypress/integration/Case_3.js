describe('Search a specific car', function () {

    let pickupdate = '2022-07-01',
        dropoffdate = '2022-07-02';

    beforeEach(() => {
        cy.fixture('tsconfig').then((usedData) => {
            this.usedData = usedData
        });
        cy.visit('http://qalab.pl.tivixlabs.com/')
    });

    it('Check correct date', () => {
        //search vechicle
        cy.get('#pickup')
            .type(pickupdate);
        cy.get('#dropoff')
            .type(dropoffdate);
        cy.get('#model')
            .type(this.usedData.searchedName);
        cy.get('.btn')
            .click();
        cy.get('#search-results')
            .should('be.visible');

        //check if row exists and contains selected car
        for (let i = 1; i < 100; i++) {
            cy.get('body')
                .then($body => {
                    if ($body.find('tbody > :nth-child(' + i + ') > :nth-child(3)'))
                        cy.get('tbody > :nth-child(' + i + ') > :nth-child(3)')
                            .should('contain.text', this.usedData.searchedName);
                });
        }
    });
});