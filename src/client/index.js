import React from 'react'
import { render, hydrate } from 'react-dom'
import { MuiThemeProvider} from '@material-ui/core/styles'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {theme} from './styles/themes'
import Routes from './routes'
import './styles/index.css'
import reducer from './redux/reducers'

/* const store = createStore(reducer, applyMiddleware(thunk)  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
*/

const logger = store => next => action => {
  console.log('before action middleware', store.getState())
  next(action)
  console.log('after action middleware', store.getState())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(logger, thunk)
))

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('content')
)
