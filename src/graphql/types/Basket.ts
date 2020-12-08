import { BasketItem } from '.'

export interface Basket {
  id: string
  ownerId: string
  basketType: 'CUSTOMER' | 'ANONYMOUS'
  items: BasketItem[]
}
