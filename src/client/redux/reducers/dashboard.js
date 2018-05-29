import * as actionTypes from '../actions'
const initialState = {
  isLoading: 0
}

// Reducer
const dashboardReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STOP_LOADING: {
      return {
        ...state,
        isLoading: state.isLoading - 1
      }
    }
    case actionTypes.START_LOADING: {
      return {
        ...state,
        isLoading: state.isLoading + 1
      }
    }
    case actionTypes.TEXT_SUBMIT: {
      return {
        ...state,
        textValue: action.payload.textValue
      }
    }
    case actionTypes.ERROR_OCCURED: {
      return {
        ...state,
        error: action.payload.error,
        isError: action.payload.isError
      }
    }
  }
  return state
}

export default dashboardReducers
