context('Homepage', () => {
  before(() => {
    cy.logout()
    cy.login(Cypress.env('TEST_USER'), Cypress.env('TEST_PASSWORD'))
  })

  it('shows the user email', function () {
    cy.get('[data-testid="service-name"]')
      .should('be.visible')
      .and('have.text', 'We Do Takeaway')
  })
})
