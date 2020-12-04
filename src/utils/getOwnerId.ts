import { v4 as uuidv4 } from 'uuid'

// The whole.. do we generate an owner id and store it or use the jwt thing..
// Just generate one/local storage for now and implement customer id when we
// add sync'd baskets
export function getOwnerId(): string {
  const owner = localStorage.getItem('owner')

  if (owner) {
    return owner
  }

  const newOwner = uuidv4()
  localStorage.setItem('owner', newOwner)

  return newOwner
}
