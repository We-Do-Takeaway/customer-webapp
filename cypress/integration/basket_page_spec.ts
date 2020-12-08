describe('Basket items page', () => {
  context('an item is added to the basket', () => {
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

    context('the user chooses to view the basket', () => {
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

      context('the user chooses to delete an item', () => {
        beforeEach(() => {
          cy.get(
            '[data-testid="basket-page-item-table"] tbody tr:first-child [data-testid="basket-page-remove-item"]'
          ).click()
        })

        it('display a confirmation dialog', () => {
          cy.get('[data-testid="delete-basket-item-confirmation"]').should(
            'exist'
          )

          cy.get('[data-testid="delete-item-dialog-title"]').contains(
            'Delete item from basket'
          )

          cy.get('[data-testid="delete-item-dialog-description"]').contains(
            'Are you sure you want to remove ‘Plate of sausages’ item from the basket?'
          )
        })

        context('press No', () => {
          beforeEach(() => {
            cy.get('[data-testid="delete-item-dialog-cancel"]').click()
          })

          it('close the dialog', () => {
            cy.get('[data-testid="delete-basket-item-confirmation"]').should(
              'not.exist'
            )
          })

          it('do not delete the item', () => {
            cy.get('[data-testid="basket-page-item-table"]').should('exist')
            cy.get(
              '[data-testid="basket-page-item-table"] tbody tr:first-child td:first-child img'
            )
              .should('have.attr', 'src')
              .should(
                'include',
                'https://www.wedotakeaway.com/images/sausages.jpg'
              )
          })
        })

        context('press Yes', () => {
          beforeEach(() => {
            cy.get('[data-testid="delete-item-dialog-confirm"]').click()
          })

          it('close the dialog', () => {
            cy.get('[data-testid="delete-basket-item-confirmation"]').should(
              'not.exist'
            )
          })

          it('delete the item', () => {
            cy.get('[data-testid="basket-page-item-table"]').should('not.exist')
          })
        })
      })
    })
  })
})
