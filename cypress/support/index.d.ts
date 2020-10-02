declare namespace Cypress {
  interface Chainable {
    login(user: string, password: string): Chainable<Element>
    logout(): Chainable<Element>
  }
}
