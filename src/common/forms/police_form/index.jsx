import React, { Component } from "react";


import ValidatorForm, {
	TextField,
	Select
} from "../../presentational/validator_form";
import Modal from "../../presentational/modal";

import "./styles.scss";

export default class PoliceForm extends Component {
  _onSubmit = ( props ) => {
  	console.log( props, "submit" );
  	this.props.onSubmit( props.formData );
    
  }

  
  render () {
  	return (
      <div
        className="row"
        >
        <ValidatorForm
          onSubmit={this._onSubmit}
          >
          <div
            className="form_elem"
            >
            <TextField
              field="police.username"
              placeholderLabel="Username"
              required
              />
          </div>
          <div 
            className="form_elem"
            >
            <TextField
              field="police.password"
              placeholderLabel="Password"
              inputType="password"
              required
              />
          </div>
          {/* <Select
              options={[{ label: "Random", value: "random" }, { label: "Trending", value: "trending" }]}
              field="genre"
              required
            /> */}
          <div
            className="flex_center"
            >
            <input type="submit" value="Login"  cssType="primary"/>
          </div>
        </ValidatorForm>
      </div>
  	);
  }
}
