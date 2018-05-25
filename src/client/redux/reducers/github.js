import * as actionTypes from '../actions'
const initialState = {
  counter: 0,
  username: '<Username>',
  followers: 0,
  following: 0,
  publicRepos: 0,
  htmlUrl: 'abc@xyz.com'
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
    case actionTypes.GITHUB_USER_RESPONSE : {
      return {
        ...state,
        username: action.payload.username,
        followers: action.payload.followers,
        following: action.payload.following,
        avatarUrl: action.payload.avatarUrl,
        htmlUrl: action.payload.htmlUrl,
        publicRepos: action.payload.publicRepos
      }
    }
    case actionTypes.USER_SUBMIT : {
      return {
        ...state,
        username: action.payload.username
      }
    }
  }
  return state
}

export default githubReducer
