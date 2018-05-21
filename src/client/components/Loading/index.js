import React from 'react'
import './style.css'
import LinearProgress from '@material-ui/core/LinearProgress'

const progressBar = {}
class LoadingContainer extends React.Component {
  constructor (props) {
    super(props)
	  this.state = {
	  	isLoading: this.props.isLoading
	  }
	}	
  componentDidMount(){
  	progressBar.showLoader = this._showLoader;
  	progressBar.hideLoader = this._hideLoader;
  	window.progressBar = progressBar
  }
  _showLoader = ()=>{
  	this.setState({isLoading:true})
  }
  _hideLoader = ()=>{
  	this.setState({isLoading:false})
  }

  render(){
  	return (
  		<div>
  			{
  				this.state.isLoading &&<LinearProgress color= "secondary" className="progress-bar"/>
  			}
  		</div>	
  	)
  }
  
}

export default progressBar

export {
	LoadingContainer
}