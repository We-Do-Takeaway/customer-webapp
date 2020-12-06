export interface Basket {
  id: string
  ownerId: string
  basketType: 'CUSTOMER' | 'ANONYMOUS'
  items: {
    id: string
    name: string
    quantity: number
  }[]
}
