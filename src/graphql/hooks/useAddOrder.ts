import { gql, useMutation } from '@apollo/client'
import { AddOrderInput, OrderItemInput } from '../types'
import { Order } from '../../types'
import { getOwnerId } from '../../utils'

export interface AddOrderMutationResponse {
  addOrder: {
    order?: {
      id: string
    }
  }
}

const ADD_ORDER_MUTATION = gql`
  mutation AddOrder($input: AddOrderInput!) {
    addOrder(input: $input) {
      order {
        id
      }
    }
  }
`

export const useAddOrder = () => {
  const [callAddOrder, result] = useMutation<
    AddOrderMutationResponse,
    AddOrderInput
  >(ADD_ORDER_MUTATION)

  const addOrder = (order: Order) => {
    const variables: AddOrderInput = {
      input: {
        ...order.contact,
        ownerId: getOwnerId(),
        items: order.items.map((item) => {
          const orderItem: OrderItemInput = {
            itemId: item.id,
            quantity: item.quantity,
          }

          return orderItem
        }),
      },
    } as AddOrderInput

    return callAddOrder({
      variables,
    })
  }

  return { addOrder, result }
}
