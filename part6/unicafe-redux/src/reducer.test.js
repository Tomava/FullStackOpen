import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  const actionGood = {
    type: 'GOOD'
  }
  const actionOk = {
    type: 'OK'
  }
  const actionBad = {
    type: 'BAD'
  }
  const actionZero = {
    type: 'ZERO'
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }
    deepFreeze(initialState)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('all are incremented', () => {
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, actionGood)
    newState =counterReducer(newState, actionOk)
    newState = counterReducer(newState, actionBad)
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })

  test('reset works', () => {
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, actionGood)
    newState = counterReducer(newState, actionOk)
    newState = counterReducer(newState, actionBad)
    newState = counterReducer(newState, actionZero)
    expect(newState).toEqual(initialState)
  })
})