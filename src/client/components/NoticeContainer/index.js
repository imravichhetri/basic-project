import React from 'react'


const Notice={}
class NoticeContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	isModalOpen: false,
    	modalData: this.props.modalData
    }
    Notice.openModal=this._openModal
    Notice.closeModal=this.closeModal
    Notice.updateModalData=this._updateModalData
  }

  _openModal=( data = this.props.modalData )=>{
  	this.setState({isModalOpen:true})
  }
  _closeModal=()=>{
  	this.setState({isModalOpen:true})
  }
  _updateModalData=(data)=>{
  	this.setState({
  			modalData:data,
  			isModalOpen:true
  	})
  }

  render(){

  }
}

export default Notice

export {
	NoticeContainer
}