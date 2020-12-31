const clearBasketQuery = `
  mutation ClearBasketByOwnerId($id: ID!) {
    clearBasketByOwnerId(id: $id) {
      basket {
        id
      }
    }
  }
`

Cypress.Commands.add('clearBasket', () => {
  // Get the owner
  const owner = window.localStorage.getItem('owner')
  const url = Cypress.env('API_URL')

  if (!owner) return

  cy.request({
    method: 'POST',
    url,
    body: {
      operationName: 'ClearBasketByOwnerId',
      query: clearBasketQuery,
      variables: {
        id: owner,
      },
    },
  })
})
