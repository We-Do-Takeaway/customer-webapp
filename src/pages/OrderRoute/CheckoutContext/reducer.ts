import { Order } from '../../../types'
import { CheckoutAction } from './actions'
import { contextDefaultValue } from './CheckoutContext'

function reducer(state: Order, action: CheckoutAction) {
  switch (action.type) {
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contact: action.payload,
      }
    case 'RESET_CHECKOUT':
      return { ...contextDefaultValue.order }
    default:
  }

  return state
}

export default reducer
