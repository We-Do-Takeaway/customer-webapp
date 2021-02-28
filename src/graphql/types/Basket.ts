import { BasketItem } from '.'

export interface Basket {
  id: string
  basketType: 'CUSTOMER' | 'ANONYMOUS'
  items: BasketItem[]
}
