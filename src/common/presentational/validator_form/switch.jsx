import {
	Form,
	Switch as AntSwitch,
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
export default class Switch extends ValidatorComponent {

  static propTypes = {
  	disabled: PropTypes.bool,
  	label: PropTypes.string,
  	layout: PropTypes.object,
  	toolTipLabel: PropTypes.string,
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
  	if ( !_.isUndefined( nextProps.value ) ){
  		_.assignObjectForKey( stateObj, "value", nextProps.value );
  	} else if ( !prevState.defaultUpdated && !_.isUndefined( nextProps.defaultValue ) ) {
  		_.assignObjectForKey( stateObj, "value", nextProps.defaultValue );
  	}

  	if ( prevState.error ){
  		_.assignObjectForKey(
  			stateObj,
  			"error",
  			Switch.validate(
  				stateObj.value ? stateObj.value : prevState.value,
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
  	defaultUpdated: false,
  	error: "",
  	value: false
  };

  _onChange = async ( value ) => {
  	if ( !this.props.value ){
  		this.setState( {
  			value,
  			defaultUpdated: true
  		}, () => {
  			if ( this.props.onChange ){
  				this.props.onChange( this.state.value );
  			}
  		} );
  	} else {
  		if ( this.props.onChange ){
  			await this.props.onChange( value );
  			if ( this.state.error ){
  				this._validate();
  			}
  		}
  	}
  };

  _inputRenderer = () => {
  	return (
      <AntSwitch
        checked={ this.state.value }
        onChange={ this._onChange }
        disabled={ this.props.disabled }
        checkedChildren={ this.props.checkedChildren }
        unCheckedChildren={ this.props.unCheckedChildren }
        />
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
