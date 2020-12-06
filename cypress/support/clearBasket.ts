const clearBasketQuery = `
  mutation ClearBasket($id: ID!) {
    clearBasket(id: $id) {
      basket {
        id
      }
      errors {
        code
        message
      }
    }
  }
`

const basketByOwnerQuery = `
  query BasketByOwner($id: ID!) {
    basketByOwnerId(id: $id) {
      id
    }
  }
`

Cypress.Commands.add('clearBasket', async (ownerId: string) => {
  // Get the owner
  const owner = window.localStorage.getItem('owner')

  if (!owner) return

  const url = Cypress.env('API_URL')

  cy.request({
    method: 'POST',
    url,
    body: {
      operationName: 'BasketByOwner',
      query: ``,
      variables: {
        id: ownerId,
      },
    },
  })
    .its('body.data.basketByOwnerId.id')
    .then((basketId) => {
      cy.request({
        method: 'POST',
        url,
        body: {
          operationName: 'ClearBasket',
          query: clearBasketQuery,
          variables: {
            id: basketId,
          },
        },
      })
    })
})
