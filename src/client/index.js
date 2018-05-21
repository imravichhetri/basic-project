import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import { MuiThemeProvider} from '@material-ui/core/styles'

import {theme} from './styles/themes'
import Dashboard from './containers/Dashboard'
import './styles/index.css'

class App extends React.Component {
  render () {
    return <div>check!!!...</div>
  }
}

render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  </MuiThemeProvider>
  ,
  document.getElementById('content')
)
