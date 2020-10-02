const timeout = 10000

Cypress.Commands.add('login', (user: string, password: string) => {
  cy.visit('http://localhost:3000/home')

  cy.get('#kc-header-wrapper', { timeout }).should('be.visible')
  cy.get('[name="username"]', { timeout }).type(user)
  cy.get('[name="password', { timeout }).type(password)
  cy.get('#kc-login').click()
  cy.get('[data-testid="home"]', { timeout }).should('be.visible')
})

Cypress.Commands.add('logout', () => {
  const keycloakUrl = Cypress.env('KEYCLOAK_URL')
  const realm = Cypress.env('KEYCLOAK_REALM')

  const url = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout`

  return cy.request({
    url,
  })
})
