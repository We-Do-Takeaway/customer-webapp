export interface OrderItemInput {
  itemId: string
  quantity: number
}

export interface AddOrderInput {
  input: {
    name: string
    address1: string
    address2?: string
    town: string
    postcode: string
    phone: string
    email?: string
    deliveryInstructions?: string
    ownerId: string
    items: OrderItemInput[]
  }
}
