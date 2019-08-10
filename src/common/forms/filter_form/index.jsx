import React, { Component } from "react";


import ValidatorForm, {
	TextField,
	Select
} from "../../presentational/validator_form";

export default class FilterForm extends Component {
  _onSubmit = ( props ) => {
  	console.log( props, "submit" );
  }
  render () {
  	return (
      <div
        className="row"
        >
        <ValidatorForm
          onSubmit={  this._onSubmit }
          >
          <div>
            <TextField
              field="name"
              placeholderLabel="Name"
              required
              />
          </div>
          <div>
            <Select
              options={[ { label: "Random", value: "random" }, { label: "Trending", value: "trending" } ]}
              field="genre"
              required
              />
          </div>
          <div
            className="flex_center"
            >
            <input type="submit" value="Submit" />
          </div>
        </ValidatorForm>
      </div>
  	);
  }
}
