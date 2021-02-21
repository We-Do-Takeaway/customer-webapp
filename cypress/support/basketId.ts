import { v4 as uuidv4 } from 'uuid'

Cypress.Commands.add('setBasketId', (basketId: string) => {
  window.localStorage.setItem('basketId', basketId)
})

Cypress.Commands.add('clearBasketId', () => {
  window.localStorage.removeItem('basketId')
})

Cypress.Commands.add('resetBasketId', () => {
  const basketId = uuidv4()
  window.localStorage.setItem('basketId', basketId)
})
