import * as actionTypes from '../actions'
const initialState = {
  counter: 0,
  username: '<Username>'
}

// Reducer
const githubReducer = (state = initialState, action) => {
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
    case actionTypes.USER_SUBMIT : {
      return {store: {
        ...state.store,
        username: action.payload.username
      }}
    }
  }
  return {store: state}
}

export default githubReducer
