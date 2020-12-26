import { Contact } from '../../../types'

export interface UpdateContactAction {
  type: 'UPDATE_CONTACT'
  payload: Contact
}

export type CheckoutAction = UpdateContactAction
