const timeout = 10000

context('Authentication', () => {
  context('When the user has not logged in', () => {
    beforeEach(() => {
      cy.visit('/home')
    })

    it('redirect them to the login page', () => {
      cy.get('[data-testid="login-page"]').should('be.visible')
    })

    context('when the user logs in', () => {
      beforeEach(() => {
        cy.get('[name="username"]', { timeout }).should('be.visible')
        cy.get('[name="username"]', { timeout }).type(Cypress.env('TEST_USER'))
        cy.get('[name="password', { timeout }).type(
          Cypress.env('TEST_PASSWORD')
        )
        cy.get('[data-testid="login-button"').click()
      })

      it('take the user to the home page', function () {
        cy.get('[data-testid="home-page"]')
      })

      it('show the user name', function () {
        cy.get('[data-testid="profile-menu__user-email"]')
          .should('be.visible')
          .and('have.text', 'zac@thetolleys.com')
      })

      context('when the user logs out', () => {
        beforeEach(() => {
          cy.get('[data-testid="profile-menu__user-email"]').click()
          cy.get('[data-testid="logout-button"]').click()
        })

        it('redirect them to the login page', () => {
          cy.get('[data-testid="login-page"]').should('be.visible')
        })
      })
    })
  })
})
