import { Button, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { VerticalTextField } from '../../components'
import { Contact } from '../../types'
import { CheckoutContext } from './CheckoutContext'
import { useStyles } from './useStyles'

export const CheckoutAddressForm: React.FC<{
  onDone: () => void
}> = ({ onDone }) => {
  const classes = useStyles()
  const history = useHistory()
  const { order, updateContact } = useContext(CheckoutContext)

  const { register, handleSubmit, errors } = useForm<Contact>()

  const onSubmit = (data: Contact) => {
    updateContact(data)
    onDone()
  }

  return (
    <form
      data-testid="contact-details-form"
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        data-testid="contact-details-title"
        className={classes.heading}
        variant="h5"
        component="h1"
      >
        Deliver to
      </Typography>

      <Paper className={classes.paper}>
        <div className={classes.paperContent}>
          <VerticalTextField
            data-testid="name-field"
            label="Name"
            name="name"
            defaultValue={order.contact?.name}
            variant="outlined"
            inputRef={register({
              required: {
                value: true,
                message: 'You must provide a name',
              },
              maxLength: {
                value: 99,
                message:
                  'Wow that is a really long address; you need to split it over the 2 boxes',
              },
            })}
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            autoFocus
          />

          <VerticalTextField
            data-testid="address1-field"
            label="Address"
            name="address1"
            defaultValue={order.contact?.address1}
            variant="outlined"
            inputRef={register({
              required: {
                value: true,
                message: 'You must provide the first line of your address',
              },
              maxLength: {
                value: 99,
                message:
                  'Wow that is a really long address; you need to split it over the 2 boxes',
              },
            })}
            fullWidth
            error={!!errors.address1}
            helperText={errors.address1?.message}
          />

          <VerticalTextField
            data-testid="address2-field"
            name="address2"
            defaultValue={order.contact?.address2}
            variant="outlined"
            inputRef={register({
              maxLength: {
                value: 99,
                message: 'Wow that is a really long address',
              },
            })}
            fullWidth
            error={!!errors.address2}
            helperText={errors.address2}
          />

          <VerticalTextField
            data-testid="town-field"
            label="Town"
            name="town"
            defaultValue={order.contact?.town}
            variant="outlined"
            inputRef={register({
              required: {
                value: true,
                message: 'Just to be sure, we really need the town',
              },
              maxLength: {
                value: 99,
                message:
                  "Even the town with the longest name in the world isn't that long",
              },
            })}
            fullWidth
            error={!!errors.town}
            helperText={errors.town?.message}
          />

          <VerticalTextField
            data-testid="postcode-field"
            label="Postcode"
            name="postcode"
            defaultValue={order.contact?.postcode}
            variant="outlined"
            inputRef={register({
              required: {
                value: true,
                message: 'We need a Postcode for the delivery persons sat nav',
              },
              maxLength: {
                value: 8,
                message: 'Postcodes are not that long',
              },
            })}
            fullWidth
            error={!!errors.postcode}
            helperText={errors.postcode?.message}
          />

          <VerticalTextField
            data-testid="phone-field"
            label="Phone number"
            name="phone"
            defaultValue={order.contact?.phone}
            variant="outlined"
            inputRef={register({
              required: {
                value: true,
                message:
                  "Please provide a number in case delivery person can't find you",
              },
              maxLength: {
                value: 20,
                message: 'Phone number tooooooooo long',
              },
            })}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <VerticalTextField
            data-testid="email-field"
            label="Email"
            name="email"
            defaultValue={order.contact?.email}
            variant="outlined"
            inputRef={register}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <VerticalTextField
            data-testid="instructions-field"
            multiline
            label="Delivery instructions"
            name="deliveryInstructions"
            defaultValue={order.contact?.deliveryInstructions}
            variant="outlined"
            inputRef={register({
              maxLength: {
                value: 500,
                message:
                  'Pretty sure with the address we only brief notes to find you.',
              },
            })}
            fullWidth
            rows={8}
            error={!!errors.deliveryInstructions}
            helperText={errors.deliveryInstructions?.message}
          />
        </div>
      </Paper>

      <div className={classes.buttonBar}>
        <Button
          color="default"
          data-testid="checkout-cancel-button"
          type="button"
          variant="contained"
          onClick={() => history.goBack()}
          className={classes.button}
        >
          Cancel
        </Button>

        <Button
          color="primary"
          data-testid="checkout-submit-button"
          type="submit"
          variant="contained"
          className={classes.button}
        >
          Proceed
        </Button>
      </div>
    </form>
  )
}
