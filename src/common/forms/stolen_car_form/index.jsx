import React, { Component } from "react";


import ValidatorForm, {
	TextField,
	Select
} from "../../presentational/validator_form";

export default class StolenCarForm extends Component {
  _onSubmit = ( {formData} ) => {
  	this.props.onSubmit( formData );
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
              field="car.number"
              placeholderLabel="Car number"
              required
              />
          </div>
          <div 
            className="form_elem"
            >
            <TextField
              field="car.model"
              placeholderLabel="Model"
              required
              />
          </div>
          <div 
            className="form_elem"
            >
            <TextField
              field="car.brand"
              placeholderLabel="Brand"
              required
              />
          </div>
          <div 
            className="form_elem"
            >
            <TextField
              field="car.color"
              placeholderLabel="Color"
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
            <input type="submit" value="Submit" cssType="primary" />
          </div>
        </ValidatorForm>
      </div>
  	);
  }
}
