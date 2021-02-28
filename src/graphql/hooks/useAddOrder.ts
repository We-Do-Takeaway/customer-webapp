import { gql, useMutation } from '@apollo/client'

import { Order } from '../../types'
import { AddOrderInput, OrderItemInput } from '../types'
import { getServerErrors } from '../utils'

export interface AddOrderMutationResponse {
  addOrder: {
    id: string
  }
}

interface AddOrderVariables {
  order: AddOrderInput
}

const ADD_ORDER_MUTATION = gql`
  mutation AddOrder($order: AddOrderInput!) {
    addOrder(order: $order) {
      id
    }
  }
`

export const useAddOrder = () => {
  const [callAddOrder, { data, error, loading }] = useMutation<
    AddOrderMutationResponse,
    AddOrderVariables
  >(ADD_ORDER_MUTATION)

  const addOrder = (order: Order) => {
    const items = order.items.map((item) => {
      const orderItem: OrderItemInput = {
        id: item.id,
        quantity: item.quantity,
      }

      return orderItem
    })

    const variables: AddOrderVariables = {
      order: {
        ...order.contact,
        items,
      } as AddOrderInput,
    }

    return callAddOrder({
      variables,
    })
  }

  const errors = error ? getServerErrors(error) : undefined

  return { addOrder, data, errors, loading }
}
