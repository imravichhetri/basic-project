/* import {
	Form,
	Input,
	Tooltip
} from "antd"; */
import PropTypes from "prop-types";
import React from "react";
// import InputMask from "react-input-mask";
import {
	has as _Has
} from "lodash";

import ValidatorComponent from "./validator_component";

import {
	FormContextItem
} from "./form_context";
import "./styles.css";

class TextField extends ValidatorComponent {
  static propTypes = {
  	disabled: PropTypes.bool,
  	label: PropTypes.string,
  	layout: PropTypes.object,
  	toolTipLabel: PropTypes.string,
  	placeholderLabel: PropTypes.string,
  	value: PropTypes.oneOfType( [
  		PropTypes.bool,
  		PropTypes.string,
  		PropTypes.number
  	] ),
  	defaultValue: PropTypes.oneOfType( [
  		PropTypes.bool,
  		PropTypes.string,
  		PropTypes.number
  	] )
  };


  _onChange = async ( e ) => {
  	if ( !_Has( this.props ,"value" ) ){
  		this.setState( {
  			value: e.target.value,
  			defaultUpdated: true
  		}, () => {
  			if ( this.props.onChange ){
  				this.props.onChange( this.state.value );
  			}
  		} );
  	} else {
  		if ( this.props.onChange ){
  			await this.props.onChange( e.target.value );
  			if ( this.state.error ){
  				this._validate();
  			}
  		}
  	}
  };

  _inputRenderer = () => {
  	return (
			<input
				id="textField"
				value={ this.state.value }
				type={this.props.inputType || "text"}
				onChange={this._onChange}
				placeholder={this.props.placeholderLabel}
				size="small"
				disabled={this.props.disabled ? true : false}
				required={ this.props.required }
				/>
  	);
  }

  _inputContainer = () => {
  	/* if ( this.props.toolTipLabel ){
  		return (
      	<Tooltip
      		title={ this.props.toolTipLabel }
      		trigger={ [ "focus" ] }
      		placement="bottom"
      		>
      		{ this._inputRenderer() }
      	</Tooltip>
  		);
  	} */
  	return this._inputRenderer();
  };

  _render = () => {
  	// console.log("In Here..");
  	return (
    	<React.Fragment>
				<label forHtml="textField">
					{ this.props.label }
				</label>
    		{ this._inputContainer() }
			</React.Fragment>
  	);
  }
}

export default FormContextItem( TextField );