import * as actionTypes from './'
import { getUserData } from '../../utils/apis'
export const submitUsername = username => {
  return async dispatch => {
    const { data } = await getUserData(username)
    return dispatch({
      type: actionTypes.USER_SUBMIT,
      payload: { username: data.login }
    })
  }
}
