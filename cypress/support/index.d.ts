declare namespace Cypress {
  interface Chainable {
    clearBasket(): Chainable<Element>
    clearOwner(): Chainable<Element>
    resetOwner(): Chainable<Element>
    setOwner(owner: string): Chainable<Element>
  }
}
