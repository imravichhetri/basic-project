import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import ErrorBoundComponent from "../error_bound_component";
import FormContext from "./form_context";

export default class ValidatorForm extends ErrorBoundComponent {

  static propTypes = {
  	children: PropTypes.node.isRequired,
  	onSubmit: PropTypes.func.isRequired,
  	onError: PropTypes.func,
  	disabled: PropTypes.bool
  };

  static defaultProps = {
  	disabled: false
  };

  validators = {};
  resetFields = {};

  _onSubmit = ( e ) => {
  	if ( e ){
  		e.preventDefault();
  	}
  	debugger;
  	this.props.onSubmit( this._validate() );
  };

  _validate = ( ) => {
  	let errors;
  	const formData = _.cloneDeep( {} );
  	_.each( this.validators, ( validator ) => {
  		const validation = validator( true );
  		if ( validation ){
  			if ( validation.error ){
  				if ( !errors ) {
  					errors = {};
  				}
  				errors[ validation.field ] = validation.error;
  				return;
  			} 
  			_.each( validation.value, ( val, key ) => {
  				if( this.props.deepClean ) {
    				if( key === "undefined" ) {
    					return;
    				}
  					if( val !== 0 && !val && !_.isBoolean( val ) ) {
  						return;
  					}
  					if( _.isString( val ) ) {
  						_.assignObjectForKey( formData, key, val.trim() );
  					} else {
  						_.assignObjectForKey( formData, key, val );
  					}   
  				} else {
  					if( _.isString( val ) ) {
  						_.assignObjectForKey( formData, key, val.trim() );
  					} else {
  						_.assignObjectForKey( formData, key, val );
  					}              
  				}
  			} );        
  		}
  	} );
  	return {
  		formData,
  		errors
  	};
  };

  _resetFields = ( ...exceptionFields ) => {
  	_.each( this.resetFields, ( reset ) => {
  		if( !_.includes( exceptionFields, reset[1] ) ) {
  			reset[ 0 ]( true );
  		}
  	} );
  	return true;
  };
  
  _addToResetField = ( fieldId, reseter, field ) => {
  	this.resetFields[ fieldId ] = [ reseter, field ];
  };

  _deleteFromResetField = ( fieldId ) => {
  	_.unset( this.validator, fieldId );
  };

  _addValidatorToForm = ( fieldId, validator ) => {
  	this.validators[ fieldId ] = validator;

  };

  _deleteValidatorsFromForm = ( fieldId ) => {
  	_.unset( this.validator, fieldId );
  };

  _formRenderer = () => {
  	const { onSubmit, ...props } = this.props;
  	return (
      <form
        onSubmit={ this._onSubmit }
        { ...props }
        id="validator_form"
        >
        { this.props.children }
      </form>
  	);
  };

  _render = () => {
  	return (
      <FormContext.Provider
        value={ {
        	addValidatorToForm: this._addValidatorToForm,
        	deleteValidatorFromForm: this._deleteValidatorsFromForm,
        	addToResetField: this._addToResetField,
        	deleteFromResetField: this._deleteValidatorsFromForm,
        	disabled: this.props.disabled ? true : false
        } }
        >
        { this._formRenderer() }
      </FormContext.Provider>
  	);
  }
}
