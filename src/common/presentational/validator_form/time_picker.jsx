import {
	TimePicker,
	Form,
	Tooltip
} from "antd";
import Moment from "moment";
import PropTypes from "prop-types";
import React from "react";


import ValidatorComponent from "./validator_component";

import {
	FormContextItem
} from "./form_context";


@FormContextItem
export default class OnlyTimePicker extends ValidatorComponent {
    static propTypes = {
    	defaultInitialized: false,
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
    	] ),
    	defaultOpenValue: PropTypes.oneOfType( [
    		PropTypes.bool,
    		PropTypes.string,
    		PropTypes.number
    	] ),
    	format: PropTypes.string
    };

    // static _RangePickerSubComponent = class DateTimeRangePicker extends ValidatorComponent {

    //   /*static getDerivedStateFromProps( newProps, prevState ) {
    //     console.log( newProps,'newProps' )
    //     const stateObj = {};
    //     if( _.isArray( newProps.value )
    //       && !( Moment.isMoment( prevState.value[ 0 ] && Moment.isMoment( prevState.value[ 1 ] ) ) ) ) {
    //       stateObj.value =  [ prevState.value[ 0 ].toISOString(), prevState.value[ 1 ].toISOString() ]
    //     }
    //     return stateObj;
    //   };*/

    //  /* _onChange = async ( args ) => {
    //     if ( !this.props.value ){
    //       console.log( args,'args1' )
    //       this.setState( {
    //         value: args  ,
    //         defaultUpdated: true
    //       }, () => {
    //         if ( this.props.onChange ){
    //           this.props.onChange( this.state.value );
    //         }
    //       } );
    //     } else {
    //       console.log( args,'args2' )
    //       if ( this.props.onChange ){
    //         console.log( this,'inside this.props.onChange' )
    //         if( Moment.isMoment( args[ 0 ] && Moment.isMoment( args[ 1 ] ) ) ) {
    //           await this.props.onChange( args );
    //         } else {
    //           await this.props.onChange( args );
    //         }
    //         if ( this.state.error ){
    //           this._validate();
    //         }
    //       }
    //     }
    //   };*/

    //   _onChange = async ( args ) => {
    //     if ( !this.props.value ){
    //       this.setState( {
    //         value: Moment.isMoment( args[ 0 ] ) ? args : [ args[ 0 ].target.value, args[ 1 ].target.value ]  ,
    //         // value: Moment.isMoment( args[ 0 ] ) ? args : args  ,
    //         defaultUpdated: true
    //       }, () => {
    //         if ( this.props.onChange ){
    //           this.props.onChange( Moment.isMoment( args[ 0 ] ) ? [ args[ 0 ].toISOString(), args[ 1 ].toISOString() ] : [ args[ 0 ].target.value, args[ 1 ].target.value ] );
    //           // this.props.onChange( this.state.value );
    //         }
    //       } );
    //     } else {
    //       if ( this.props.onChange ){
    //         if( Moment.isMoment( args[ 0 ] && Moment.isMoment( args[ 1 ] ) ) ) {
    //           await this.props.onChange( [ args[ 0 ].toISOString(), args[ 1 ].toISOString() ]/*format( 'YYYY-MM-DD HH:mm' )*/ );
    //         } else {
    //           await this.props.onChange( [ args[ 0 ].target.value, args[ 1 ].target.value ] );
    //         }
    //         if ( this.state.error ){
    //           this._validate();
    //         }
    //       }
    //     }
    //   };

    //   _inputRenderer = () => {
    //     return (
    //       <DatePicker.RangePicker
    //         className="full_width"
    //         style={ { width:"100%" } }
    //         placeholder={ this.props.placeholderLabel || [ "Start Date", "End Date" ] }
    //         disabled={ this.props.disabled }
    //         showTime={ this.props.showTime || false }
    //         onChange={ this._onChange }
    //         onOk={ this.props.onOk }
    //         value={ this.state.value }
    //         format={ this.props.DATE_TIME_FORMAT || "YYYY-MM-DD HH:mm:ss" }
    //         />
    //     );
    //   };
    //   _inputContainer = () => {
    //     if ( this.props.toolTipLabel ){
    //       return (
    //         <Tooltip
    //           title={ this.props.toolTipLabel }
    //           trigger={ [ 'focus' ] }
    //           placement="bottom"
    //           >
    //           { this._inputRenderer() }
    //         </Tooltip>
    //       );
    //     }
    //     return this._inputRenderer();
    //   };

    //   _render = () => {
    //     return (
    //       <Form.Item
    //       validateStatus={ this.state.error ? 'error' : 'success' }
    //       help={ this.state.error }
    //       label={ this.props.label }
    //       { ...this.props.layout }
    //       >
    //       { this._inputContainer() }
    //     </Form.Item>
    //     );
    //   }
    // };
    // static RangePicker = FormContextItem( DateTimePicker._RangePickerSubComponent );

    static getDerivedStateFromProps ( newProps, prevState ) {
    	const stateObj =  {};
    	if( !prevState.defaultInitialized ) {
    		stateObj.value = newProps.defaultValue;
    		stateObj.defaultValue = newProps.defaultValue;
    		stateObj.defaultInitialized = true;
    	}
    	if( Moment.isMoment( newProps.defaultValue ) &&  Moment.isMoment( prevState.defaultValue ) && newProps.defaultValue.diff( prevState.defaultValue ) ) {
    		stateObj.value = newProps.defaultValue;
    		stateObj.defaultValue = newProps.defaultValue;
    	}
    	if( !Moment.isMoment( newProps.defaultValue ) &&  !Moment.isMoment( prevState.defaultValue ) && newProps.defaultValue !== prevState.defaultValue ) {
    		stateObj.value = newProps.defaultValue;
    		stateObj.defaultValue = newProps.defaultValue;
    	}
    	return stateObj;
    }

    _onChange = async ( args ) => {
    	console.log( args,this, "_onChange tim_picker" )
    	if ( !this.props.value ){
    		this.setState( {
    			value: Moment.isMoment( args ) ? args : "",
    			defaultUpdated: true
    		}, () => {
    			if ( this.props.onChange ){
    				this.props.onChange( this.state.value );
    			}
    		} );
    	} else {
    		if ( this.props.onChange ){
    			if( Moment.isMoment( args ) ) {
    				await this.props.onChange( args.toISOString()/*format( 'YYYY-MM-DD HH:mm' )*/ );
    			} else {
    				await this.props.onChange( args.target.value );
    			}
    			if ( this.state.error ){
    				this._validate();
    			}
    		}
    	}
    };

    // componentWillUnmount() {
    //   console.log( 'componentWillUnmount' )
    // };

    _onOk= async ( args ) => {
    	if ( !this.props.value ){
    		this.setState( {
    			value: Moment.isMoment( args ) ? args : "",
    			defaultUpdated: true
    		}, () => {
    			if ( this.props.onOk ){
    				this.props.onOk( this.state.value );
    			}
    		} );
    	} else {
    		if ( this.props.onOk ){
    			if( Moment.isMoment( args ) ) {
    				await this.props.onOk( this.state.value/*format( 'YYYY-MM-DD HH:mm' )*/ );
    			} else {
    				await this.props.onOk( this.state.value );
    			}
    			if ( this.state.error ){
    				this._validate();
    			}
    		}
    	}
    }

    _inputRenderer = () => {
    	return (
            <TimePicker
                className="full_width"
                format={ this.props.format || "HH:mm:ss" }
                placeholder={ this.props.placeholderLabel }
                onChange={ this._onChange }
                onOk={ this.props.onOk ? this._onOk : this._onChange }
                value={ this.state.value }
                defaultOpenValue={ this.props.defaultOpenValue }
                defaultValue={ this.state.defaultValue }
                disabledHours={ this.props.disabledHours }
                disabledMinutes={ this.props.disabledMinutes }
                disabledSeconds={ this.props.disabledSeconds }
                hourStep={ this.props.hourStep || 1 }
                minuteStep={ this.props.minuteStep || 1 }
                secondStep={ this.props.secondStep || 1 }
                use12Hours={ this.props.use12Hours || false }
                />
    	);
    };

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
    	console.log( this,"time_picker" )
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
