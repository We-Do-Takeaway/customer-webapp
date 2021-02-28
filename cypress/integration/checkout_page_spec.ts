describe('Checkout page', () => {
  const firstSection = '[data-testid="section-list-section"]:first-child'
  const firstItem = '[data-testid="section-items-item"]:first-child'

  context('There are no items in the basket', () => {
    beforeEach(() => {
      cy.visit('/order/contact-details')
    })

    it('takes the user back to the empty basket page', () => {
      cy.url().should('include', '/basket')
    })
  })

  context('a single item is added to the basket', () => {
    beforeEach(() => {
      cy.visit('/menu/11ca8caa-e5dc-494d-bcfd-79fdeb34b1b1')

      cy.get(
        `${firstSection} ${firstItem} [data-testid="add-to-basket-button"]`
      ).click()

      cy.get('[data-testid="basket-indicator"] button').click()
      cy.get('[data-testid="proceed-to-checkout"]').click()
    })

    it('indicate the user is on the first step of checking out', () => {
      cy.get('.MuiStepLabel-active').should('exist')
      cy.get('.MuiStepLabel-active').contains('Enter contact details')
    })

    it('show a heading for the contact section and form', () => {
      cy.get('[data-testid="contact-details-form"]').should('exist')
      cy.get('[data-testid="contact-details-title"]').should('exist')
      cy.get('[data-testid="contact-details-title"]').contains('Deliver to')
    })

    context('the user submits an empty contact form', () => {
      beforeEach(() => {
        cy.get('[data-testid="checkout-submit-button"]').click()
      })

      it('inform the user about required fields', () => {
        cy.get(
          '[data-testid="name-field"] .MuiFormLabel-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="name-field"] .MuiInputBase-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="name-field"] .MuiFormHelperText-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="name-field"] .MuiFormHelperText-root.Mui-error'
        ).should('contain', 'You must provide a name')

        cy.get(
          '[data-testid="address1-field"] .MuiFormLabel-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="address1-field"] .MuiInputBase-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="address1-field"] .MuiFormHelperText-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="address1-field"] .MuiFormHelperText-root.Mui-error'
        ).should('contain', 'You must provide the first line of your address')

        cy.get(
          '[data-testid="town-field"] .MuiFormLabel-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="town-field"] .MuiInputBase-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="town-field"] .MuiFormHelperText-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="town-field"] .MuiFormHelperText-root.Mui-error'
        ).should('contain', 'Just to be sure, we really need the town')

        cy.get(
          '[data-testid="postcode-field"] .MuiFormLabel-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="postcode-field"] .MuiInputBase-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="postcode-field"] .MuiFormHelperText-root.Mui-error'
        ).should('exist')
        cy.get(
          '[data-testid="postcode-field"] .MuiFormHelperText-root.Mui-error'
        ).should(
          'contain',
          'We need a Postcode for the delivery persons sat nav'
        )
        cy.get(
          '[data-testid="phone-field"] .MuiFormHelperText-root.Mui-error'
        ).should(
          'contain',
          "Please provide a number in case delivery person can't find you"
        )
      })

      it('do not warn about optional fields', () => {
        cy.get(
          '[data-testid="address2-field"] .MuiFormLabel-root.Mui-error'
        ).should('not.exist')

        cy.get(
          '[data-testid="email-field"] .MuiFormLabel-root.Mui-error'
        ).should('not.exist')

        cy.get(
          '[data-testid="instructions-field"] .MuiFormLabel-root.Mui-error'
        ).should('not.exist')
      })
    })

    context(
      'the user enters their contact details and submits the form',
      () => {
        beforeEach(() => {
          cy.get('input[name="name"]').type('Fred Smith')
          cy.get('input[name="address1"]').type('10 The Street')
          cy.get('input[name="address2"]').type('South Place')
          cy.get('input[name="town"]').type('Funvile')
          cy.get('input[name="postcode"]').type('PP1 1LL')
          cy.get('input[name="phone"]').type('321123123')
          cy.get('input[name="email"]').type('fred@acme.corp')
          cy.get('textarea[name="deliveryInstructions"]').type('By the door')

          cy.get('[data-testid="checkout-submit-button"]').click()
        })

        it('move to place order step', () => {
          cy.url().should('include', '/order/place-order')
        })

        it('display the delivery details', () => {
          cy.get('h2[data-testid="delivery-heading"]').contains(
            'Delivery details'
          )
          cy.get('[data-testid="delivery-name"]').contains('Fred Smith')
          cy.get('[data-testid="delivery-address"]').contains(
            '10 The Street, South Place, Funvile, PP1 1LL'
          )
          cy.get('[data-testid="delivery-phone"]').contains('321123123')
          cy.get('[data-testid="delivery-email"]').contains('fred@acme.corp')
          cy.get('[data-testid="delivery-instructions"]').contains(
            'By the door'
          )
        })

        context('the user selects go back', () => {
          beforeEach(() => {
            cy.get('[data-testid="checkout-back-button"]').click()
          })

          it('send the user back to the contact details stage', () => {
            cy.url().should('include', '/contact-details')
          })
        })

        context('the user selects confirm', () => {
          beforeEach(() => {
            cy.get('[data-testid="checkout-confirm-button"]').click()
          })

          it('display a receipt page', () => {
            cy.url().should('include', '/order/receipt')
            cy.get('h1').should('contain', 'Receipt')
            cy.get('.MuiStepLabel-active').contains('Receipt')
          })

          it('include the order id in the page', () => {
            cy.get('[data-testid="order-id"]').should('be.visible')
            cy.get('[data-testid="order-id"]').should('not.be.empty')
          })

          it('clear the contents of the basket', () => {
            cy.get('[data-testid="basket-indicator-count"]').should('not.exist')
          })

          context('the user tries to go back', () => () => {
            beforeEach(() => {
              cy.go('back')
            })

            it('realise empty context and return to basket', () => {
              cy.url().should('include', '/basket')
              cy.get('Your basket is currently empty').should('be.visible')
            })
          })
        })
      }
    )

    context('The user enters the minimum details', () => {
      beforeEach(() => {
        cy.get('input[name="name"]').type('Fred Smith')
        cy.get('input[name="address1"]').type('10 The Street')
        cy.get('input[name="town"]').type('Funvile')
        cy.get('input[name="postcode"]').type('PP1 1LL')
        cy.get('input[name="phone"]').type('321123123')

        cy.get('[data-testid="checkout-submit-button"]').click()
      })

      it('move to place order step', () => {
        cy.url().should('include', '/order/place-order')
      })

      it('display the delivery details', () => {
        cy.get('h2[data-testid="delivery-heading"]').contains(
          'Delivery details'
        )
        cy.get('[data-testid="delivery-name"]').contains('Fred Smith')
        cy.get('[data-testid="delivery-address"]').contains(
          '10 The Street, Funvile, PP1 1LL'
        )
        cy.get('[data-testid="delivery-phone"]').contains('321123123')
      })

      it('do not include the optional data', () => {
        cy.get('[data-testid="delivery-address2"]').should('not.exist')
        cy.get('[data-testid="delivery-email"]').should('not.exist')
        cy.get('[data-testid="delivery-instructions-section"]').should(
          'not.exist'
        )
      })
    })

    context('The user goes direct to the place order step', () => {
      beforeEach(() => {
        cy.visit('/order/place-order')
      })

      it('send the user back to the contact details stage', () => {
        cy.url().should('include', '/contact-details')
      })
    })
  })
})
