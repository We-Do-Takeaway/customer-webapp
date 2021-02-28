export interface OrderItemInput {
  id: string
  quantity: number
}

export interface AddOrderInput {
  name: string
  address1: string
  address2?: string
  town: string
  postcode: string
  phone: string
  email?: string
  deliveryInstructions?: string
  items: OrderItemInput[]
}
