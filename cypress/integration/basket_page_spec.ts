describe('Basket items page', () => {
  const firstSection = '[data-testid="section-list-section"]:first-child'
  const firstItem = '[data-testid="section-items-item"]:first-child'

  beforeEach(() => {
    // Reset basket and owner
    cy.resetOwner()
    cy.clearBasket()
  })

  context('a single item is added to the basket', () => {
    beforeEach(() => {
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
        cy.get('[data-testid="image-600dca30-c6e2-4035-ad15-783c122d6ea4"]')
          .should('have.attr', 'src')
          .should('include', 'https://www.wedotakeaway.com/images/sausages.jpg')

        cy.get(
          '[data-testid="description-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
        ).contains('Plate of sausages')

        cy.get(
          '[data-testid="quantity-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
        ).contains('1')
      })

      context('the user chooses to remove the item', () => {
        beforeEach(() => {
          cy.get(
            '[data-testid="remove-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
          ).click()
        })

        it('display a confirmation dialog', () => {
          cy.get('[data-testid="remove-basket-item-confirmation"]').should(
            'exist'
          )

          cy.get('[data-testid="remove-item-dialog-title"]').contains(
            'Remove item from basket'
          )

          cy.get('[data-testid="remove-item-dialog-description"]').contains(
            'Are you sure you want to remove ‘Plate of sausages’ item from the basket?'
          )
        })

        context('press No', () => {
          beforeEach(() => {
            cy.get('[data-testid="remove-item-dialog-cancel"]').click()
          })

          it('close the dialog', () => {
            cy.get('[data-testid="remove-basket-item-confirmation"]').should(
              'not.exist'
            )
          })

          it('do not remove the item', () => {
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
            cy.get('[data-testid="remove-item-dialog-confirm"]').click()
          })

          it('close the dialog', () => {
            cy.get('[data-testid="remove-basket-item-confirmation"]').should(
              'not.exist'
            )
          })

          it('remove the item', () => {
            cy.get('[data-testid="basket-page-item-table"]').should('not.exist')
          })
        })
      })

      context('the user tries to reduce the quantity', () => {
        beforeEach(() => {
          cy.get(
            '[data-testid="decrease-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
          ).click()
        })

        it('remain at 1', () => {
          cy.get(
            '[data-testid="quantity-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
          ).contains('1')
        })
      })

      context('the user tries to increase the quantity', () => {
        beforeEach(() => {
          cy.get(
            '[data-testid="increase-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
          ).click()
        })

        it('update the quantity to 2', () => {
          cy.get(
            '[data-testid="quantity-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
          ).contains('2')
        })

        context('the user tries to reduce the quantity', () => {
          beforeEach(() => {
            cy.get(
              '[data-testid="decrease-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
            ).click()
          })

          it('reduce to 1', () => {
            cy.get(
              '[data-testid="quantity-600dca30-c6e2-4035-ad15-783c122d6ea4"]'
            ).contains('1')
          })
        })
      })
    })
  })
})
