import { v4 as uuidv4 } from 'uuid'

Cypress.Commands.add('setOwner', (owner: string) => {
  window.localStorage.setItem('owner', owner)
})

Cypress.Commands.add('clearOwner', () => {
  window.localStorage.removeItem('owner')
})

Cypress.Commands.add('resetOwner', () => {
  const owner = uuidv4()
  window.localStorage.setItem('owner', owner)
})
