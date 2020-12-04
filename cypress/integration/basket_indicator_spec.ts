context('Basket indicator', () => {
  before(() => {
    cy.visit('/home')
  })

  it('show a basket indicator in the header', function () {
    cy.get('[data-testid="home-page"]').should('be.visible')
  })

  it('show a basket indicator in the header', () => {
    cy.get('[data-testid="basket-indicator"]').should('be.visible')
  })
})
