describe('Add Basket Item', () => {
  const firstSection = '[data-testid="section-list-section"]:first-child'
  const firstItem = '[data-testid="section-items-item"]:first-child'

  beforeEach(() => {
    // Reset basket and owner
    cy.resetOwner()
    cy.clearBasket()
  })

  context('When viewing the menu', () => {
    beforeEach(() => {
      cy.visit('/menu/600dca30-c6e2-4035-ad15-783c122d6ea1')
    })

    it('display Add options in each item', () => {
      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-button"]`
      )
        .should('be.visible')
        .contains('Add')
    })

    it('Display a counter defaulted to 1 in each', () => {
      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-quantity"]`
      )
        .should('be.visible')
        .contains('1')
    })

    it('let the user increase and decrease the quantity to add', () => {
      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-increase"]`
      ).click()

      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-quantity"]`
      ).contains('2')

      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-decrease"]`
      ).click()

      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-quantity"]`
      ).contains('1')
    })

    context('When the user adds a single item', () => {
      beforeEach(() => {
        cy.get(
          `${firstSection} ${firstItem} [data-testid="add-to-basket-button"]`
        ).click()
      })

      it('Updates the basket items count', () => {
        cy.get('[data-testid="basket-indicator-count"]').contains('1')
      })

      it('displays a message to tell the user they added something', () => {
        cy.get('[data-testid="add-notification"]').should('be.visible')
      })
    })

    context('When the user adds multiple items', () => {
      beforeEach(() => {
        cy.get(
          `${firstSection} ${firstItem} [data-testid="add-to-basket-increase"]`
        ).click()

        cy.get(
          `${firstSection} ${firstItem} [data-testid="add-to-basket-button"]`
        ).click()
      })

      it('Updates the basket items count', () => {
        cy.get('[data-testid="basket-indicator-count"]').contains('2')
      })
    })
  })
})
