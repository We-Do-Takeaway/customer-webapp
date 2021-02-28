const clearBasketQuery = `
  mutation ClearBasket($basketId: ID!) {
    clearBasket(basketId: $basketId) {
      id
    }
  }
`

Cypress.Commands.add('clearBasket', () => {
  // Get the basket id
  const basketId = window.localStorage.getItem('basketId')
  const url = '/graphql/'

  if (!basketId) return

  cy.request({
    method: 'POST',
    url,
    body: {
      operationName: 'ClearBasket',
      query: clearBasketQuery,
      variables: {
        basketId,
      },
    },
  })
})
