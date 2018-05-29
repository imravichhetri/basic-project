import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Icon, Input } from "semantic-ui-react";
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {sendUsername} from '../../redux/actions'
import {LoadingContainer} from '../../components/Loading'
import NavigationBar from '../../components/NavigationBar'
import { styles } from "./styles.js";
import "./styles.css";
// import 'semantic-ui-css/semantic.min.css'

/*const mapStateToProps = state =>{console.log(state,'state'); return state}// ({ctr:state.username, username:state.username})
const mapDispatchToProps = dispatch =>({actions:  {
		submitClickHandler: bindActionCreators(submitClickHandler, dispatch),
		sendUsername: bindActionCreators(sendUsername,dispatch)
	}})

@connect(mapStateToProps,mapDispatchToProps)*/
export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavOpen: false,
			textValue:''
		};
		this.textInput=React.createRef()
	}

	_searchButtonHandler = (event)=>{
		console.log(this.textInput.current.value ,'value')
		this.setState({textValue:this.textInput.current.value})
		this.props.actions.submitClickHandler(this.textInput.current.value)
	};

	_header = () => (
		<AppBar className="app-bar">
			<Grid container>
				<Grid item xs={1} offset={2}>
					<IconButton className="menu-button" onClick={()=>{this.setState({isNavOpen: !this.state.isNavOpen});console.log('Heyo', this.state)}}>
						<MenuIcon />
					</IconButton>
				</Grid>
				<Grid item md={2} />
				<Grid item xs={5} md={5} className="center-container">
					<input className="textInput" placeholder="Search..." ref={this.textInput} />
					<button className='submitButton' onClick={this._searchButtonHandler}><SearchIcon>search</SearchIcon></button>
					{/*<button className='submitButton'>Search</button>*/}
				</Grid>
				<Grid item md={3}/>
				<Grid item md={1} className='avatar-container'>
					<Avatar className='avatar'>R</Avatar>
				</Grid>
			</Grid>
			<LoadingContainer/>
		</AppBar>
	);

	_body = () => (
		<React.Fragment >
			<div className={`navigation-container navigation-container-${this.state.isNavOpen?'nav-open':'nav-close'}`}>
				<NavigationBar/>
			</div>
			{this._header()}
			<div className={`content-container content-container-${this.state.isNavOpen?'nav-open':'nav-close'}`}>
				{this.props.children
						/*const childWIthProps = React.Children.map(this.props.children,(child)=>{
							return React.cloneElement(child, {
					      textValue: this.textInput.current.value
					    })
						})
						 React.Children.map(this.props.children,(child)=>{
							return React.cloneElement(child, /*{
					      textValue: this.state.textValue,
					      ...this.props
					    } this.props)
						})*/
				}
			</div>
		</React.Fragment>
	)

	render() {
		console.log(this.props,'Dashboard props')
		return (
			<div className={`dashboard-container dashboard-container-${this.state.isNavOpen?'nav-open':'nav-close'}`}>
				{this._body()}
			</div>
		)
	}
}

