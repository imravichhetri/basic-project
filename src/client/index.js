import React from 'react'
import { render } from 'react-dom'
import { MuiThemeProvider} from '@material-ui/core/styles'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {theme} from './styles/themes'
import Routes from './routes'
import './styles/index.css'
import reducer from './redux/reducer'
const store = createStore(reducer)

class App extends React.Component {
  render () {
    return <div>check!!!...</div>
  }
}
render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('content')
)
