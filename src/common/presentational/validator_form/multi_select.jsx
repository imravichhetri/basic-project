import {
	Form,
	Select,
	Tooltip
} from "antd";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import VirtualizedSelect from "../virtualized_select/index";

import ValidatorComponent from "./validator_component";

import {
	FormContextItem
} from "./form_context";

@FormContextItem
export default class MultiSelect extends ValidatorComponent {

  static propTypes = {
  	disabled: PropTypes.bool,
  	label: PropTypes.string,
  	layout: PropTypes.object,
  	toolTipLabel: PropTypes.string,
  	placeholderLabel: PropTypes.string,
  	options: PropTypes.array.isRequired,
  	value: PropTypes.arrayOf( PropTypes.oneOfType( [
  		PropTypes.bool,
  		PropTypes.string,
  		PropTypes.number
  	] ) ),
  	defaultValue: PropTypes.arrayOf( PropTypes.oneOfType( [
  		PropTypes.bool,
  		PropTypes.string,
  		PropTypes.number
  	] ) )
  };

  static getDerivedStateFromProps ( nextProps, prevState ) {
  	const stateObj = {};
  	let currentValue = nextProps.value ? nextProps.value : prevState.value;

  	if ( !prevState.defaultUpdated && !_.isUndefined( nextProps.defaultValue ) ){
  		currentValue = nextProps.defaultValue;
  	}

  	const value = _.filter( currentValue, ( val ) => (
  		_.find( nextProps.options, { value: val } ) ? true : false
  	) );

  	stateObj.value = value;
  	if ( prevState.error ){
  		stateObj.error = MultiSelect.validate(
  			stateObj.value,
  			nextProps.validations,
  			nextProps.errors
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
  	value: []
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
      <VirtualizedSelect
				allowClear={ this.props.allowClear }
        mode="multiple"
        placeholder={ this.props.placeholderLabel }
        className="full_width"
        optionFilterProp="children"
        disabled={ this.props.disabled }
        value={ this.state.value }
        onChange={ this._onChange }
        size="small"
        filterOption={ ( input, option ) => option.props.children.toLowerCase().indexOf( input.toLowerCase() ) >= 0 }
        >
        { _.map( this.props.options, ( { label, value }, index ) => (
          <Select.Option
            key={ `select_options_${ value }_${ index }` }
            value={ value }
            >
            { label }
          </Select.Option>
        ) ) }
      </VirtualizedSelect>
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
        className="full_width"
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
