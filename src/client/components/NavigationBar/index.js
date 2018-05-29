import React from 'react'

import {Link} from 'react-router-dom'
import './styles.css'

export default class NavigationBar extends React.Component {
  constructor (props) {
    super(props)
  }


  _contents = ()=>(
  	<React.Fragment>
  		<Link to="/github/user/">Github</Link>
  		<Link to="/weather/location/">Weather</Link>
  	</React.Fragment>
  )
  render () {
    return <div className='navigation-content'>{this._contents()}</div>
  }
}
