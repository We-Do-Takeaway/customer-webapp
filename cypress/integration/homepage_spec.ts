context('Homepage', () => {
  before(() => {
    cy.logout()
    cy.login(Cypress.env('TEST_USER'), Cypress.env('TEST_PASSWORD'))
  })

  it('shows some homepage content', function () {
    cy.get('[data-testid="home"]').should('be.visible')
  })

  it('lists the menus available as cards', () => {
    cy.get('[data-testid="menu-section-item"]')
      .should('be.visible')
      .should('have.class', 'MuiCard-root')
  })

  it('displays menu summary details', () => {
    cy.get('h2[data-testid="menu-section-item-title"]')
      .first()
      .should('contain', 'Cafe comfort and waffles')

    cy.get('p[data-testid="menu-section-item-description"]')
      .first()
      .should(
        'contain',
        "The cafe is all about food to make you feel better when you can't face the world or feel like you are going crazy. Have an all day breakfast, your mothers Sunday roast or help yourself to the biggest bowl of ice-cream will lots of extras"
      )
  })
})
