describe('CRA', () => {
  it('shows learn link', function () {
    cy.visit('/')
    cy.get('[data-testid="header-content-content"]')
      .should('be.visible')
      .and('have.text', 'Welcome to We Do Takeaway')
  })
})
