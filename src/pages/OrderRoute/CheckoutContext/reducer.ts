import { Order } from '../../../types'
import { CheckoutAction } from './actions'

function reducer(state: Order, action: CheckoutAction) {
  switch (action.type) {
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contact: action.payload,
      }
    default:
  }

  return state
}

export default reducer
