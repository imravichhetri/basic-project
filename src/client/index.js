import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter
} from 'react-router-dom'
// const Tag = () => (<div>Done</div>)
class App extends React.Component {
  render () {
    return <div>check!!!...</div>
  }
}
render(
  <App />,
  document.getElementById('content')
)
