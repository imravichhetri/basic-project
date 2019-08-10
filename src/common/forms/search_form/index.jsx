import React, { Component } from "react";

import ValidatorForm, {
	TextField
} from "../../presentational/validator_form";


export default class SearchForm extends Component {
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
              field="number"
              placeholderLabel="Car model"
              required
              />
          </div>
          <div 
            className="flex_center"
            >
            <input type="submit" value="Search" cssType="primary"/>
          </div>
          {/* <Select
              options={[{ label: "Random", value: "random" }, { label: "Trending", value: "trending" }]}
              field="genre"
              required
            /> */}
        </ValidatorForm>
      </div>
  	);
  }
}
