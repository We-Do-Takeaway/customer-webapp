context('Header', () => {
  before(() => {
    cy.logout()
    cy.login(Cypress.env('TEST_USER'), Cypress.env('TEST_PASSWORD'))
  })

  it('shows the service name', function () {
    cy.get('[data-testid="service-name"]')
      .should('be.visible')
      .and('have.text', 'We Do Takeaway')
  })

  it('shows the user name', function () {
    cy.get('[data-testid="profile-menu__user-email"]')
      .should('be.visible')
      .and('have.text', 'zac@thetolleys.com')
  })
})
