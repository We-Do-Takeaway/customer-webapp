import { Contact } from './Contact'
import { BasketItem } from '../graphql'

export interface Order {
  contact?: Contact
  items: BasketItem[]
}
