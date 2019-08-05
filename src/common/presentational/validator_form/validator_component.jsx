import * as _ from "lodash";
import Uuid from "uuid/v4";

import BoundComponent from "../error_bound_component";
import Validations from "./validations";

export default class ValidatorComponent extends BoundComponent {
	static getDerivedStateFromProps ( nextProps, prevState ) {
		const stateObj = {};
		if ( !_.isUndefined( nextProps.value ) ){
			_.assignObjectForKey( stateObj, "value", nextProps.value );
		} else if ( !prevState.defaultUpdated && !_.isUndefined( nextProps.defaultValue ) ){
			_.assignObjectForKey( stateObj, "value", nextProps.defaultValue );
		}

		if ( prevState.error ){
			_.assignObjectForKey(
				stateObj,
				"error",
				ValidatorComponent.validate(
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

  static validate = ( value, validators, errors ) => {
  	for( const i in validators ){
  		const validation = Validations[ validators[ i ] ];
  		const error = validation( value, errors[ i ] );
  		if ( error ){
  			return error;
  		}
  	}
  };

  state = {
  	defaultUpdated: false,
  	error: "",
  	value: ""
  };


  constructor ( ...args ) {
  	super( ...args );

  	( this ).id = Uuid();
  }

  componentDidMount () {
  	this._addValidatorToForm();
  	this._resetField();
  }

  componentDidUpdate ( prevProps, prevState ) {
  	if ( this.props.value && prevProps.value !== this.props.value ){
  		this._validate();
  	}
  }

  componentWillUnmount () {
  	this.didUnmount = true;
  	this._deleteValidatorsFromForm();
  	this._deleteFromResetField();
  }

  _addValidatorToForm = () => {
  	if ( this.props.addValidatorToForm ){
  		this.props.addValidatorToForm( this.id, this._validate );
  	}
  };

  _deleteFromResetField = () => {
  	if( this.props.deleteFromResetField ) {
  		this.props.deleteFromResetField();
  	}
  }

  _deleteValidatorsFromForm = () => {
  	if ( this.props.deleteValidatorFromForm ){
  		this.props.deleteValidatorFromForm( this.id );
  	}
  };

  _reset = () => {
  	if( !this.didUnmount ) {
  		this.setState( { value: "" } );
  	}
  };
  
  _resetField = () => {
  	if( this.props.addToResetField ) {
  		this.props.addToResetField( this.id, this._reset, this.props.field );
  	}
  };

  _valueConstruction = () => {
  	const value = {};
  	if( this.state.value && this.props.htmlType === "number" ) {
  		if( _.isArray( this.state.value ) ) {
  			value[ this.props.field ] = _.map( this.state.value, ( value ) => +value );//+this.state.value;
  		} else {
  		  value[ this.props.field ] = +this.state.value;
  		}
  	} else if ( this.state.value && this.props.htmlType === "json" ) {
  		value[this.props.field] = JSON.parse( this.state.value );
  	} else {
  	  value[ this.props.field ] = this.state.value;
  	}
  	return value;
  };

  _validate = ( returnVal = false ) => {
  	if ( !( this  ).didUnmount ){
  		const error = ValidatorComponent.validate( this.state.value, this.props.validations, this.props.errors );
  		if ( error ){
  			this.setState( { error } );
  			return {
  				value: this._valueConstruction(),
  				error,
  				field: this.props.field
  			};
  		}

  		this.setState( { error: "" } );
  		if ( returnVal ){
  			return {
  				value: this._valueConstruction()
  			};
  		}
  	}
  };
}
