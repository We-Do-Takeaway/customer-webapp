import { Contact } from '../../../types'

export interface UpdateContactAction {
  type: 'UPDATE_CONTACT'
  payload: Contact
}

export interface ResetCheckoutAction {
  type: 'RESET_CHECKOUT'
}

export type CheckoutAction = UpdateContactAction | ResetCheckoutAction
