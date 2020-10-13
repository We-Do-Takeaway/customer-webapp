context('Homepage', () => {
  before(() => {
    cy.logout()
    cy.login(Cypress.env('TEST_USER'), Cypress.env('TEST_PASSWORD'))
  })

  it('shows some homepage content', function () {
    cy.get('[data-testid="home"]').should('be.visible')
  })
})
