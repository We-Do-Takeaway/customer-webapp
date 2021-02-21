context('Homepage', () => {
  before(() => {
    cy.visit('/home')
  })

  it('show some homepage content', function () {
    cy.get('[data-testid="home-page"]').should('be.visible')
  })

  it('list the menus available as cards', () => {
    cy.get('[data-testid="menu-summary-card"]')
      .should('be.visible')
      .should('have.class', 'MuiCard-root')
  })

  it('display menu summary details', () => {
    cy.get('h2[data-testid="menu-summary-card-title"]')
      .first()
      .should('contain', 'Cafe comfort and waffles')

    cy.get('p[data-testid="menu-summary-card-description"]')
      .first()
      .should(
        'contain',
        "The cafe is all about food to make you feel better when you can't face the world or feel like you are going crazy. Have an all day breakfast, your mothers Sunday roast or help yourself to the biggest bowl of ice-cream will lots of extras"
      )
  })

  context('When the user clicks on a menu', () => {
    beforeEach(() => {
      cy.get('[data-testid="menu-summary-card-button"]').click()
    })

    it('navigate to menu page', () => {
      cy.location('href').should(
        'contain',
        '/menu/11ca8caa-e5dc-494d-bcfd-79fdeb34b1b1'
      )
    })
  })
})
