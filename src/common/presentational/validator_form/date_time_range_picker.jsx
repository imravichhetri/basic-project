import {
	DatePicker,
	Form,
	Tooltip
} from "antd";
import _ from "lodash";
import Moment from "moment";
import PropTypes from "prop-types";
import React from "react";


import ValidatorComponent from "./validator_component";

import {
	FormContextItem
} from "./form_context";


@FormContextItem
export default class DateTimeRangePicker extends ValidatorComponent {
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
  	] ),
  	showTime: PropTypes.object,
  	dateFormat: PropTypes.string,
  	timeFormat: PropTypes.string,
  	size: PropTypes.string
  };

  _onChange = async ( args ) => {
  	if ( !this.props.value ) {
  		this.setState( {
  			value: Moment.isMoment( args[0] ) ? args : [ args[0].target.value, args[1].target.value ],
  			// value: Moment.isMoment( args[ 0 ] ) ? args : args  ,
  			defaultUpdated: true
  		}, () => {
  			if ( this.props.onChange ) {
  				this.props.onChange( Moment.isMoment( args[0] ) ? [ args[0].toISOString(), args[1].toISOString() ] : [ args[0].target.value, args[1].target.value ] );
  				// this.props.onChange( this.state.value );
  			}
  		} );
  	} else {
  		if ( this.props.onChange ) {
  			if ( Moment.isMoment( args[0] && Moment.isMoment( args[1] ) ) ) {
  				await this.props.onChange( [ args[0].toISOString(), args[1].toISOString() ]/*format( 'YYYY-MM-DD HH:mm' )*/ );
  			} else {
  				await this.props.onChange( [ args[0].target.value, args[1].target.value ] );
  			}
  			if ( this.state.error ) {
  				this._validate();
  			}
  		}
  	}
  };

  _inputRenderer = () => {
  	return (
      <DatePicker.RangePicker
        className="full_width"
        style={{ width: "100%" }}
        placeholder={this.props.placeholderLabel || [ "Start Date", "End Date" ]}
        disabled={this.props.disabled}
        showTime={this.props.showTime || false}
        onChange={this._onChange}
        onOk={this.props.onOk}
        value={this.state.value}
        format={this.props.dateTimeFormat || "YYYY-MM-DD HH:mm:ss"}
        size={ this.props.size ? this.props.size : "small" }
        />
  	)
  };
  _inputContainer = () => {
  	if ( this.props.toolTipLabel ) {
  		return (
        <Tooltip
          title={this.props.toolTipLabel}
          trigger={[ "focus" ]}
          placement="bottom"
          >
          {this._inputRenderer()}
        </Tooltip>
  		);
  	}
  	return this._inputRenderer();
  };

  _render = () => {
  	return (
      <Form.Item
        validateStatus={this.state.error ? "error" : "success"}
        help={this.state.error}
        label={this.props.label}
        {...this.props.layout}
        >
        {this._inputContainer()}
      </Form.Item>
  	)
  }
}