import * as actionTypes from './'

export const startLoading = (isLoading) => ({
  type: actionTypes.START_LOADING
})

export const stopLoading = (isLoading) => ({
  type: actionTypes.STOP_LOADING
})

export const submitClickHandler = textValue => ({
  type: actionTypes.TEXT_SUBMIT,
  payload: {
    textValue
  }
})

export const errorHandler = (error, isError) => ({
  type: actionTypes.TEXT_SUBMIT,
  payload: {
    error,
    isError
  }
})
