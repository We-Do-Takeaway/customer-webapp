import { v4 as uuidv4 } from 'uuid'

// Store an id for the basket associated with this browser
export function getBasketId(): string {
  const basketId = localStorage.getItem('basketId')

  if (basketId) {
    return basketId
  }

  const newBasketId = uuidv4()
  localStorage.setItem('basketId', newBasketId)

  return newBasketId
}
