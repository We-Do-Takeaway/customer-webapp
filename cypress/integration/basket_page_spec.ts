describe('Basket items page', () => {
  context('When an item is added to the basket', () => {
    beforeEach(() => {
      const firstSection = '[data-testid="section-list-section"]:first-child'
      const firstItem = '[data-testid="section-items-item"]:first-child'

      // Reset basket and owner
      cy.clearBasket()
      cy.resetOwner()
      cy.visit('/menu/600dca30-c6e2-4035-ad15-783c122d6ea1')

      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-button"]`
      ).click()
    })

    context('And the user chooses to view the basket', () => {
      beforeEach(() => {
        cy.get('[data-testid="basket-indicator"] button').click()
      })

      it('display the basket page', () => {
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/basket')
        })
        cy.get('[data-testid="basket-page-title"]').should('exist')
      })

      it('display the basket items', () => {
        cy.get('[data-testid="basket-page-item-table"]').should('exist')
        cy.get(
          '[data-testid="basket-page-item-table"] tbody tr:first-child td:first-child img'
        )
          .should('have.attr', 'src')
          .should('include', 'https://www.wedotakeaway.com/images/sausages.jpg')

        cy.get(
          '[data-testid="basket-page-item-table"] tbody tr:first-child td:nth-child(2)'
        ).contains('Plate of sausages')

        cy.get(
          '[data-testid="basket-page-item-table"] tbody tr:first-child td:nth-child(3)'
        ).contains('1')
      })
    })
  })
})
