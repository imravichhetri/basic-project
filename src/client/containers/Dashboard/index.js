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

import {submitUsername} from '../../redux/actions/github'
import {LoadingContainer} from '../../components/Loading'
import { styles } from "./styles.js";
import "./styles.css";
// import 'semantic-ui-css/semantic.min.css'

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navOpen: false
		};
		this.textInput=React.createRef()
	}

	_searchButtonHandler = (event)=>{
		// event.prevent.default()
		console.log(this.textInput.current.value ,'value')
		this.props.actions.submitClickHandler(this.textInput.current.value)
	};

	_header = () => (
		<AppBar className="app-bar">
			<Grid container>
				<Grid item xs={1} offset={2}>
					<IconButton className="menu-button">
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
		<React.Fragment>
			{this._header()}
			<div className="body-container">
				{this.props.children}
			</div>
		</React.Fragment>
	)

	render() {
		console.log(this.props,'Dashboard props')
		return (
			<React.Fragment>
				{this._body()}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state =>state// ({ctr:state.username, username:state.username})
const mapDispatchToProps = dispatch =>({actions:  bindActionCreators({submitClickHandler: submitUsername},dispatch)})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
