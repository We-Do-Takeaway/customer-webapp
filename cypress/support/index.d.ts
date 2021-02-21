declare namespace Cypress {
  interface Chainable {
    clearBasket(): Chainable<Element>
    clearBasketId(): Chainable<Element>
    resetBasketId(): Chainable<Element>
    setBasketId(basketId: string): Chainable<Element>
  }
}
