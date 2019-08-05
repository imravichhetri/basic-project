import {
	Button,
	Form,
	Icon,
	Tooltip,
	Upload
} from "antd";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import ValidatorComponent from "./validator_component";

import {
	FormContextItem
} from "./form_context";

@FormContextItem
export default class FileUpload extends ValidatorComponent {
  static propTypes = {
  	disabled: PropTypes.bool,
  	label: PropTypes.string,
  	layout: PropTypes.object,
  	listType: PropTypes.string,
  	toolTipLabel: PropTypes.string,
  	maxFiles: PropTypes.number,
  	accept: PropTypes.string,
  	buttonLabel: PropTypes.oneOfType( [
  		PropTypes.node
  	] ),
  	value: PropTypes.arrayOf( PropTypes.oneOfType( [
  		PropTypes.object,
  		PropTypes.string
  	] ) ),
  	defaultValue: PropTypes.arrayOf( PropTypes.oneOfType( [
  		PropTypes.object,
  		PropTypes.string
  	] ) ),
  	defaultFileList: PropTypes.arrayOf( PropTypes.object )
  };

  static defaultProps = {
  	defaultFileList: [],
  	listType: "picture",
  	buttonLabel: (
      <React.Fragment>
        <Icon type="upload" /> upload
      </React.Fragment>
  	)
  };
  static getDerivedStateFromProps ( nextProps, prevState ) {
  	const stateObj = {};
  	if ( !_.isUndefined( nextProps.value ) ){
  		_.assignObjectForKey( stateObj, "value", nextProps.value );
  	} else if ( !prevState.defaultUpdated && !_.isUndefined( nextProps.defaultValue ) ){
  		_.assignObjectForKey( stateObj, "value", nextProps.defaultValue );
  	}

  	_.assignObjectForKey( stateObj, "defaultFileList", nextProps.defaultFileList );


  	if ( prevState.error ){
  		_.assignObjectForKey(
  			stateObj,
  			"error",
  			FileUpload.validate(
  				stateObj.value ? stateObj.value : prevState.value,
  				nextProps.validations,
  				nextProps.errors
  			)
  		);
  	}

  	if( prevState.defaultFileList && nextProps.defaultFileList.length !== prevState.defaultFileList.length ) {
  		_.assignObjectForKey( stateObj, "value", [] );
  	}

  	if ( _.isEmpty( stateObj ) ){
  		return null;
  	} else {
  		return stateObj;
  	}
  }

  state ={
  	value: [ ...this.props.defaultFileList ]
  };

  _onChange = async ( { fileList } ) => {
  	if ( !this.props.value ){
  		this.setState( {
  			value: fileList,
  			defaultUpdated: true
  		}, () => {
  			if ( this.props.onChange ){
  				this.props.onChange( fileList );
  			}
  		} );
  	} else {
  		if ( this.props.onChange ){
  			await this.props.onChange( fileList );
  			if ( this.state.error ){
  				this._validate();
  			}
  		}
  	}
  };

  _inputRenderer = () => {
  	return (
      <Upload
        className="full_width"
        listType={ this.props.listType }
        accept={ this.props.accept }
        fileList={ this.state.value }
        onChange={ this._onChange }
        defaultFileList={ this.props.defaultFileList }
        >
        {
          this.state.value.length < this.props.maxFiles && (
            <div>
              <Button>
                { this.props.buttonLabel }
              </Button>
            </div>
          )
        }
      </Upload>
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
