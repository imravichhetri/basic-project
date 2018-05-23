const initialState = {
  counter: 0,
  username: '<Username>'
}

// Reducer
const rootReducer = (state = initialState, action) => {
  console.log(state, 'state')
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
      console.log(action, state)
      return {store: {
        ...state.store,
        username: action.payload.username
      }}
    }
  }
  return {store: state}
}

export default rootReducer
