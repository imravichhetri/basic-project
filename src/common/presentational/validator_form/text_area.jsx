import React from "react";
import {
	Form,
	Input,
	Tooltip
} from "antd";
import PropTypes from "prop-types";
import ValidatorComponent from "./validator_component";
import {
	FormContextItem
} from "./form_context";

@FormContextItem
export default class TextArea extends ValidatorComponent {
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
  			await this.props.onChange( e.target.value );
  			if ( this.state.error ){
  				this._validate();
  			}
  		}
  	}
  };

  _inputRenderer = () => {
  	return (
      <Input.TextArea
        value={ this.state.value }
        disabled={ this.props.disabled }
        type={ this.props.inputType }
        placeholder={ this.props.placeholderLabel }
        autosize={ this.props.autosize }
        onChange={ this._onChange }
        style={ this.props.style } 
        className={ this.props.className } 
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
