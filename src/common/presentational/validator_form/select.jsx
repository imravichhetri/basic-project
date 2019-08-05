import React from "react";
/* import {
	Form,
	Tooltip,
	Select
} from "antd"; */
import _ from "lodash";
import PropTypes from "prop-types";
// import "react-select/dist/react-select.css";
// import VirtualizedSelect from 'react-virtualized-select';
// import "react-virtualized-select/styles.css";
import ValidatorComponent from "./validator_component";
// import VirtualizedSelect from "../virtualized_select/index.jsx";
// import Select from "../virtualized_select"
import {
	FormContextItem
} from "./form_context";
import "./styles.css"

class CustomSelect extends ValidatorComponent {

  static propTypes = {
  	disabled: PropTypes.bool,
  	label: PropTypes.string,
  	layout: PropTypes.object,
  	toolTipLabel: PropTypes.string,
  	placeholderLabel: PropTypes.string,
  	field: PropTypes.string,
  	options: PropTypes.array.isRequired,
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

  static getDerivedStateFromProps ( nextProps, prevState ) {
  	const stateObj = {};
  	let currentValue = ( _.isBoolean( nextProps.value ) || nextProps.value ) ? nextProps.value : prevState.value;

  	if ( !prevState.defaultUpdated && !_.isUndefined( nextProps.defaultValue ) ){
  		currentValue = nextProps.defaultValue;
  	}

  	if ( currentValue || currentValue === 0 || _.isBoolean( currentValue ) ){
  		if ( _.find( nextProps.options, { value: currentValue } ) ){
  			_.assignObjectForKey( stateObj, "value", currentValue );
  		} else {
  			_.assignObjectForKey( stateObj, "value", undefined );
  		}
  	}

  	if ( prevState.error ){
  		_.assignObjectForKey(
  			stateObj,
  			"error",
  			CustomSelect.validate(
  				stateObj.value,
  				nextProps.validations,
  				nextProps.errors
  			)
  		);
  	}

  	if ( _.isEmpty( stateObj ) ){
  		return null;
  	} else {
  		return stateObj;
  	}
  }

  state = {
  	value: undefined,
  	error: "",
  	defaultUpdated: false
  };

  _onChange = async ( event ) => {
		console.log(event, "value")
  	if ( !_.has( this.props ,"value" ) ){
  		this.setState( {
  			value: event.target.value,
  			defaultUpdated: true
  		}, () => {
  			if ( this.props.onChange ){
  				this.props.onChange( this.state.value );
  			}
  		} );
  	} else {
  		if ( this.props.onChange ){
  			await this.props.onChange( event.target.value );
  			if ( this.state.error ){
  				this._validate();
  			}
  		}
  	}
  };



  _inputRenderer = () => {
  	return (
			<select
				id="select"
				placeholder={ this.props.placeholderLabel }
				className="full_width"
				disabled={ this.props.disabled }
				value={ this.state.value }
				onChange={ this._onChange }
				size="small"
				required={this.props.required}
				>
						<option value={undefined} selected disabled hidden>Choose here</option>
				{ _.map( this.props.options, ( { label, value, disabled }, index ) => (
					<option
						key={ `select_options_${ value }_${ index }` }
						value={ value }
						disabled={ disabled }
						size="small"
						>
						{ label }
					</option>
				) ) }
			</select>
  	);
  }

  _inputContainer = () => {
  	return this._inputRenderer();
  };

  _render = () => {
  	return (
			<React.Fragment>
				<label forHtml="select">
					{this.props.label}
				</label>
				{ this._inputContainer() }
			</React.Fragment>
  	);
  }
}

export default FormContextItem(CustomSelect)
