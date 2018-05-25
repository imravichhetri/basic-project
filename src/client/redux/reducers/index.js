import {combineReducers} from 'redux'

import githubReducers from './github'
import dashboardReducers from './dashboard'

// Reducer
const rootReducer = combineReducers({
  githubReducers,
  dashboardReducers
})

export default rootReducer
