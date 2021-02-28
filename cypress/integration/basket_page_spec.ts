describe('Basket items page', () => {
  const firstSection = '[data-testid="section-list-section"]:first-child'
  const firstItem = '[data-testid="section-items-item"]:first-child'
  const sausageId = 'a4b463c9-f786-4945-af19-fb3103d3984b'
  const menuId = '11ca8caa-e5dc-494d-bcfd-79fdeb34b1b1'

  beforeEach(() => {
    // Reset basket
    cy.resetBasketId()
  })

  afterEach(() => {
    cy.clearBasket()
  })

  context('a single item is added to the basket', () => {
    beforeEach(() => {
      cy.visit(`/menu/${menuId}`)

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
        cy.get(`[data-testid="image-${sausageId}"]`)
          .should('have.attr', 'src')
          .should('include', '/images/default-thumbnail.png')

        cy.get(`[data-testid="description-${sausageId}"]`).contains(
          'Plate of sausages'
        )

        cy.get(`[data-testid="quantity-${sausageId}"]`).contains('1')
      })

      it('let the user proceed to the checkout', () => {
        cy.get('[data-testid="proceed-to-checkout"]').should('exist')
      })

      context('the user chooses to remove the item', () => {
        beforeEach(() => {
          cy.get(`[data-testid="remove-${sausageId}"]`).click()
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
              .should('include', '/images/default-thumbnail.png')
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
          cy.get(`[data-testid="decrease-${sausageId}"]`).click()
        })

        it('remain at 1', () => {
          cy.get(`[data-testid="quantity-${sausageId}"]`).contains('1')
        })
      })

      context('the user tries to increase the quantity', () => {
        beforeEach(() => {
          cy.get(`[data-testid="increase-${sausageId}"]`).click()
        })

        it('update the quantity to 2', () => {
          cy.get(`[data-testid="quantity-${sausageId}"]`).contains('2')
        })

        context('the user tries to reduce the quantity', () => {
          beforeEach(() => {
            cy.get(`[data-testid="decrease-${sausageId}"]`).click()
          })

          it('reduce to 1', () => {
            cy.get(`[data-testid="quantity-${sausageId}"]`).contains('1')
          })
        })
      })

      context('the user selects the option to checkout', () => {
        beforeEach(() => {
          cy.get('[data-testid="proceed-to-checkout"]').click()
        })

        it('take the user to the checkout page', () => {
          cy.url().should('include', '/order/contact-details')
        })
      })
    })
  })

  context('the basket is empty', () => {
    beforeEach(() => {
      cy.visit(`/menu/${menuId}`)
      cy.get('[data-testid="basket-indicator"] button').click()
    })

    it('display a message to say the basket it empty', () => {
      cy.get('[data-testid="basket-page-empty"]').should('exist')
    })

    it('does not display an option to proceed to checkout', () => {
      cy.get('[data-testid="proceed-to-checkout"]').should('not.exist')
    })
  })
})
