import React from 'react'
import { ApolloError } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'

import { BasketContext } from '../../contexts'
import { Basket, UseResponse } from '../../graphql'
import { BasketPage } from './BasketPage'

describe('Basket Page', () => {
  let wrapper: RenderResult

  describe('When the basket is loading', () => {
    beforeEach(() => {
      const value = {
        loading: true,
      }

      wrapper = render(
        <MockedProvider addTypename={false}>
          <BasketContext.Provider value={value}>
            <MemoryRouter initialEntries={['/basket']}>
              <Route path="/basket">
                <BasketPage />
              </Route>
            </MemoryRouter>
          </BasketContext.Provider>
        </MockedProvider>
      )
    })

    it('display a loading indicator', () => {
      expect(wrapper.getByTestId('basket-page-loading')).toBeInTheDocument()
    })

    it('display a title', () => {
      expect(wrapper.getByTestId('basket-page-title')).toBeInTheDocument()
      expect(wrapper.getByTestId('basket-page-title')).toHaveTextContent(
        'Basket items'
      )
    })

    it('do not display a table of results', () => {
      expect(
        wrapper.queryByTestId('basket-page-item-table')
      ).not.toBeInTheDocument()
    })
  })

  describe('when a basket is loaded with items', () => {
    beforeEach(() => {
      const data: Basket = {
        id: '1234',
        basketType: 'ANONYMOUS',
        items: [
          {
            id: '3311',
            quantity: 1,
            name: 'Chips',
            photo: '/chips.png',
          },
          {
            id: '2211',
            quantity: 2,
            name: 'Apples',
            photo: '/apple.png',
          },
        ],
      }

      const value = {
        data,
      }

      wrapper = render(
        <MockedProvider addTypename={false}>
          <BasketContext.Provider value={value}>
            <MemoryRouter initialEntries={['/basket']}>
              <Route path="/basket">
                <BasketPage />
              </Route>
            </MemoryRouter>
          </BasketContext.Provider>
        </MockedProvider>
      )
    })

    it('do not display a loading indicator', () => {
      expect(
        wrapper.queryByTestId('basket-page-loading')
      ).not.toBeInTheDocument()
    })

    it('display a title', () => {
      expect(wrapper.getByTestId('basket-page-title')).toBeInTheDocument()
      expect(wrapper.getByTestId('basket-page-title')).toHaveTextContent(
        'Basket items'
      )
    })

    it('display table with titles for the different data we display', () => {
      expect(wrapper.getByTestId('basket-page-item-table')).toBeInTheDocument()

      const headings = wrapper.container.querySelectorAll(
        '[data-testid="basket-page-item-table"] th'
      )

      expect(headings[1]).toHaveTextContent('Name')
      expect(headings[2]).toHaveTextContent('Quantity')
    })

    it('display a line for each item', () => {
      const lines = wrapper.container.querySelectorAll(
        '[data-testid="basket-page-item-table"] tbody tr'
      )

      expect(lines).toHaveLength(2)
    })

    it('display the item name', () => {
      const item = wrapper.container.querySelector(
        '[data-testid="basket-page-item-table"] tbody tr td:nth-child(2)'
      )

      expect(item).toHaveTextContent('Chips')
    })

    it('display the item quantity', () => {
      const item = wrapper.container.querySelector(
        '[data-testid="basket-page-item-table"] tbody tr td:nth-child(3)'
      )

      expect(item).toHaveTextContent('1')
    })

    it('display a picture of the item', () => {
      const item = wrapper.container.querySelector(
        '[data-testid="basket-page-item-table"] tbody tr td:first-child img'
      )

      expect(item).toHaveAttribute('src', '/chips.png')
    })
  })

  describe('when a basket is loaded with no items', () => {
    beforeEach(() => {
      const data: Basket = {
        id: '1234',
        basketType: 'ANONYMOUS',
        items: [],
      }

      const value: UseResponse<Basket> = {
        data,
      }

      wrapper = render(
        <MockedProvider addTypename={false}>
          <BasketContext.Provider value={value}>
            <BasketPage />
          </BasketContext.Provider>
        </MockedProvider>
      )
    })

    it('do not display a loading indicator', () => {
      expect(
        wrapper.queryByTestId('basket-page-loading')
      ).not.toBeInTheDocument()
    })

    it('display a title', () => {
      expect(wrapper.getByTestId('basket-page-title')).toBeInTheDocument()
      expect(wrapper.getByTestId('basket-page-title')).toHaveTextContent(
        'Basket items'
      )
    })

    it('do not display a table of results', () => {
      expect(
        wrapper.queryByTestId('basket-page-item-table')
      ).not.toBeInTheDocument()
    })

    it('display a message to tell the user their basket is empty', () => {
      expect(wrapper.getByTestId('basket-page-empty')).toBeInTheDocument()
    })
  })

  describe('when there is an error loading the basket', () => {
    beforeEach(() => {
      const errors: ApolloError[] = [
        {
          message: 'Something happened',
        } as ApolloError,
      ]

      const value = {
        errors,
      }

      wrapper = render(
        <MockedProvider addTypename={false}>
          <BasketContext.Provider value={value}>
            <BasketPage />
          </BasketContext.Provider>
        </MockedProvider>
      )
    })

    it('do not display a loading indicator', () => {
      expect(
        wrapper.queryByTestId('basket-page-loading')
      ).not.toBeInTheDocument()
    })

    it('display a title', () => {
      expect(wrapper.getByTestId('basket-page-title')).toBeInTheDocument()
      expect(wrapper.getByTestId('basket-page-title')).toHaveTextContent(
        'Basket items'
      )
    })

    it('do not display a table of results', () => {
      expect(
        wrapper.queryByTestId('basket-page-item-table')
      ).not.toBeInTheDocument()
    })

    it('display a message to tell the user there was an error', () => {
      expect(wrapper.getByTestId('basket-page-error')).toBeInTheDocument()
      expect(wrapper.getByTestId('basket-page-error')).toHaveTextContent(
        'Something happened'
      )
    })
  })
})
