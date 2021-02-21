import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult } from '@testing-library/react'
import { BasketContext } from '../../contexts'
import { Basket } from '../../graphql'
import { BasketIndicator } from './BasketIndicator'

describe('Basket indicator', () => {
  let wrapper: RenderResult

  describe('when there are no items in the basket', () => {
    beforeEach(() => {
      const basket: Basket = {
        id: '1234',
        basketType: 'ANONYMOUS',
        items: [],
      }

      const value = {
        basket,
        loading: false,
      }

      wrapper = render(
        <BasketContext.Provider value={value}>
          <BasketIndicator />
        </BasketContext.Provider>
      )
    })

    it('render a basket', () => {
      expect(wrapper.getByTestId('basket-indicator')).toBeInTheDocument()
    })

    it('indicate the basket is empty', () => {
      const buttonLabel = wrapper.container.querySelector(
        '[data-testid="basket-indicator"] .MuiButton-text'
      )

      expect(buttonLabel).toBeInTheDocument()
      expect(buttonLabel).not.toHaveClass('MuiButton-textPrimary')
    })

    it('does not show a zero count', () => {
      const indicatorCount = wrapper.container.querySelector(
        '[data-testid="basket-indicator"] [data-testid="basket-indicator-count"]'
      )

      expect(indicatorCount).not.toBeInTheDocument()
    })
  })

  describe('when there are items in the basket', () => {
    beforeEach(() => {
      const data: Basket = {
        id: '1234',
        basketType: 'ANONYMOUS',
        items: [
          {
            id: '3311',
            quantity: 1,
            name: 'chips',
          },
        ],
      }

      const value = {
        data,
      }

      wrapper = render(
        <BasketContext.Provider value={value}>
          <BasketIndicator />
        </BasketContext.Provider>
      )
    })

    it('render a basket indicator', () => {
      expect(wrapper.getByTestId('basket-indicator')).toBeInTheDocument()
    })

    it('indicate the basket is populated', () => {
      const buttonLabel = wrapper.container.querySelector(
        '[data-testid="basket-indicator"] .MuiButton-text'
      )

      expect(buttonLabel).toBeInTheDocument()
      expect(buttonLabel).toHaveClass('MuiButton-textPrimary')
    })

    it('show the item count', () => {
      const indicatorCount = wrapper.container.querySelector(
        '[data-testid="basket-indicator"] [data-testid="basket-indicator-count"]'
      )

      expect(indicatorCount).toBeInTheDocument()
      expect(indicatorCount).toHaveTextContent('1')
    })
  })
})
