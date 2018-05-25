import * as actionTypes from './'
import {startLoading, stopLoading} from './dashboard'
import { getUserData } from '../../utils/apis'

export const sendUsername = username => {
  return async dispatch => {
    dispatch({type: actionTypes.START_LOADING})
    const { data } = await getUserData(username)
    dispatch({type: actionTypes.STOP_LOADING})
    dispatch({
      type: actionTypes.GITHUB_USER_RESPONSE,
      payload: {
        username: data.login,
        followers: data.followers,
        following: data.following,
        avatarUrl: data.avatar_url,
        htmlUrl: data.html_url,
        publicRepos: data.public_repos
      }
    })
  }
}

export const submitClickHandler = username => ({
  type: actionTypes.USER_SUBMIT,
  payload: { username }
})
