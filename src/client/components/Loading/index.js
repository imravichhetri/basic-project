import React from 'react'
import './style.css'
import LinearProgress from '@material-ui/core/LinearProgress'

const ProgressBar = {}
class LoadingContainer extends React.Component {
  state = {
    isLoading:this.props.isLoading
  }
  componentDidMount(){
    ProgressBar.showLoader = this._showLoader;
    ProgressBar.hideLoader = this._hideLoader;
    ProgressBar.print = this._print;
    ProgressBar.a =123;
    console.log(ProgressBar,'ProgressBar======componentDidMount')
    window.ProgressBar = ProgressBar
  }

  
  _showLoader = ()=>{
    this.setState({isLoading:true})
  }
  _hideLoader = ()=>{
    this.setState({isLoading:false})
  }

  render(){
    console.log(this.props,'this.props')
    return (
      <div className="progress-bar-container">
        {
          this.state.isLoading &&<LinearProgress color= "secondary" className="progress-bar"/>
        }
      </div>  
    )
  }
}

export default ProgressBar;

export {
  LoadingContainer
}