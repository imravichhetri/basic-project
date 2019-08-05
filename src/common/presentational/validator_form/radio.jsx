import {
	Form,
	Radio as AntRadio,
	Tooltip
} from "antd";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import ValidatorComponent from "./validator_component";

import {
	FormContextItem
} from "./form_context";

@FormContextItem
export default class Radio extends ValidatorComponent {

  static propTypes = {
  	disabled: PropTypes.bool,
  	label: PropTypes.string,
  	layout: PropTypes.object,
  	toolTipLabel: PropTypes.string,
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
  	let currentValue = nextProps.value ? nextProps.value : prevState.value;

  	if ( !prevState.defaultUpdated && !_.isUndefined( nextProps.defaultValue ) ){
  		currentValue = nextProps.defaultValue;
  	}

  	if ( currentValue ){
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
  			Radio.validate(
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

  _onChange = async ( e ) => {
  	if ( !this.props.value ){
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
  			await this.props.onChange( this.value );
  			if ( this.state.error ){
  				this._validate();
  			}
  		}
  	}
  };

  _inputRenderer = () => {
  	return (
      <AntRadio.Group
        value={ this.state.value }
        onChange={ this._onChange }
        disabled={ this.props.disabled }
        >
        { _.map( this.props.options, ( { label, value } ) => (
          <AntRadio.Button
            key={ `radio_options_${ value }` }
            value={ value }
            >
            { label }
          </AntRadio.Button>
        ) ) }
      </AntRadio.Group>
  	);
  }

  _inputContainer = () => {
  	if ( this.props.toolTipLabel ){
  		return (
        <Tooltip
          title={ this.props.toolTipLabel }
          trigger={ [ "focus" ] }
          placement="bottom"
          >
          { this._inputRenderer() }
        </Tooltip>
  		);
  	}
  	return this._inputRenderer();
  };

  _render = () => {
  	return (
      <Form.Item
        validateStatus={ this.state.error ? "error" : "success" }
        help={ this.state.error }
        label={ this.props.label }
        { ...this.props.layout }
        >
        { this._inputContainer() }
      </Form.Item>
  	);
  }
}
