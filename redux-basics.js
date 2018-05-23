const {createStore} = require('redux')

const initialState = {
  counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_COUNTER': {
      return {
        ...state,
        counter: state.counter + 1
      }
    }
    case 'ADD_COUNTER': {
      return {
        ...state,
        counter: state.counter + action.value
      }
    }
    case 'SUBMITTED_USERNAME': {
      return {
        ...state,
        username: action.value.username
      }
    }
  }
  return state
}
// Store
const store = createStore(rootReducer)
console.log(store.getState())

// Subscription
store.subscribe(() => {
  console.log('subscription:', store.getState())
})

// Dispatching Action
store.dispatch({type: 'INC_COUNTER'})
store.dispatch({type: 'ADD_COUNTER', value: 10})
store.dispatch({type: 'INC_COUNTER'})

console.log(store.getState())
