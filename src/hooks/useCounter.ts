import { useReducer } from 'react'

export interface CounterState {
  count: number
}

export interface CounterAction {
  type: 'increment' | 'decrement'
}

export const useCounter = ({ initialCount = 0, max = 20, min = 0 }) => {
  const initialState: CounterState = {
    count: initialCount,
  }

  function reducer(state: CounterState, action: CounterAction) {
    switch (action.type) {
      case 'increment':
        if (state.count < max) return { count: state.count + 1 }
        break
      case 'decrement':
        if (state.count > min) return { count: state.count - 1 }
        break
      default:
      // Do nothing
    }
    return state
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return { dispatch, reducer, state }
}
