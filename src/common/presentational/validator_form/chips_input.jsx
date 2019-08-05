import {
	Form,
	Icon,
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
export default class ChipsInput extends ValidatorComponent {

  static propTypes = {
  	disabled: PropTypes.bool,
  	label: PropTypes.string,
  	layout: PropTypes.object,
  	toolTipLabel: PropTypes.string,
  	placeholderLabel: PropTypes.string,
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
  	if ( !_.isUndefined( nextProps.value ) ){
  		_.assignObjectForKey( stateObj, "value", nextProps.value );
  	} else if ( !prevState.defaultUpdated && !_.isUndefined( nextProps.defaultValue ) ) {
  		_.assignObjectForKey( stateObj, "value", nextProps.defaultValue );
  	}

  	if ( prevState.error ){
  		_.assignObjectForKey(
  			stateObj,
  			"error",
  			ChipsInput.validate(
  				stateObj.value ? stateObj.value : prevState.value,
  				nextProps.validations,
  				nextProps.errors
  			)
  		);
  	}

  	if ( _.isEmpty( stateObj ) ){
  		return null;
  	}
  	return stateObj;
  }

  state = {
  	value: [],
  	error: "",
  	inputValue: "",
  	defaultUpdated: false
  };

  _onChange = async ( state ) => {
  	if ( !this.props.value ){
  		const stateObj = { ...state,  defaultUpdated: true };
  		this.setState( stateObj, () => {
  			if ( this.state.error ){
  				this._validate();
  			}
  			if ( this.props.onChange ){
  				this.props.onChange( this.state.value );
  			}
  		} );
  	} else {
  		if ( this.props.onChange ){
  			await this.props.onChange( state );
  			if ( this.state.error ){
  				this._validate();
  			}
  		}
  	}
  };

  _inputValueChange = ( e ) => {
  	const stateObj = {
  		inputValue: e.target.value
  	};

  	if ( !_.isUndefined( this.state.selectedItemIndex ) ){
  		stateObj.value = _.map( this.state.value, ( value, index ) => (
  			index === this.state.selectedItemIndex ? e.target.value : value
  		) );
  	}
  	this._onChange( stateObj );
  };

  _onInputKeydown = ( e ) => {
  	if ( e.keyCode === 13 || e.keyCode === 188 ){
  		e.preventDefault();
  		e.stopPropagation();
  		const stateObj = {
  			value: _.isUndefined( this.state.selectedItemIndex ) ? _.concat( this.state.value, [ this.state.inputValue ] ) : this.state.value,
  			inputValue: ""
  		};

  		if ( !_.isUndefined( this.state.selectedItemIndex ) ){
  			stateObj.selectedItemIndex = undefined;
  		}
  		this._onChange( stateObj );
  	}
  };

  _valueChips = () => (
  	_.map( this.state.value, ( value, index ) => (
      <span
        onClick={ () => {
        	this.setState( {
        		selectedItemIndex: index,
        		inputValue: value
        	}, () => {
        		this.inputRef.focus();
        	} );
        } }
        key={ `chip_input_${ index }` }
        className={ ( `chip ${ this.state.selectedItemIndex === index ? "active" : "" }` ).trim() }
        >
        <span>
          { value.length < 15 ? value : value.substring( 0, 15 ).concat( "..." ) }
        </span>
        <Icon
          onClick={ ( e ) => {
          	e.preventDefault();
          	e.stopPropagation();
          	const stateObj = {
          		value: _.remove( this.state.value, ( pValue, pIndex ) => ( pIndex !== index ) ),
          		inputValue: this.state.inputValue
          	};

          	if ( this.state.selectedItemIndex === index ){
          		stateObj.selectedItemIndex = undefined;
          		stateObj.inputValue = "";
          	}
          	this._onChange( stateObj );
          } }
          type="close"
          />
      </span>
  	) )
  );

  _inputRenderer = () => {
  	return (
      <div
        className={ ( `chips_input_container ${ this.state.error ? "has_error" : "" } ${ this.props.disabled ? "disabled": "" }` ).trim() }
        onClick={ () => ( this.inputRef.focus() ) }
        >
        { this._valueChips() }
        <input
          disabled={ this.props.disabled }
          onKeyDown={ this._onInputKeydown }
          placeholder={ this.props.placeholderLabel }
          onChange={ this._inputValueChange }
          value={ this.state.inputValue }
          ref={ ( r ) => ( this.inputRef = r ) }
          />
      </div>
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
