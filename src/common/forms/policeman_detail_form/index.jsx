import React from "react";
import PropTypes from "prop-types";

import ValidatorForm, {
	TextField,
	Select
} from "../../presentational/validator_form";

const PolicemanDetailForm = props => {
	const _onSubmit = ( { formData, errors } ) => {
		console.log( formData, errors );
		props.onSubmit( formData );
	};
	return (
    <div
      className="row"
      >
      <ValidatorForm
        onSubmit={ _onSubmit }
        >
        <div
          className="form_elem"
          >
          <b>Name:</b> { props.defaults.name }
        </div>
        <div
          className="form_elem"
          >
          <b>Current assigned task:</b>{ props.defaults.currentAssignedCase || "No task assigned"}
        </div>
        {
          props.defaults.currentAssignedCase && (
            <React.Fragment>
              <div>
                <TextField
                  field="number"
                  placeholderLabel="Car model"
                  defaultValue={ props.defaults.currentAssignedCase }
                  />
                <TextField
                  field="username"
                  placeholderLabel="User name"
                  defaultValue={ props.defaults.username }
                  />
              </div>
              <div
                className="form_elem"
                >
                <Select
                  options={[ { label: "Resolved", value: "RESOLVED" } ]}
                  field="status"
                  required
                  />
              </div>
              <div
                className="flex_center"
                >
                <input type="submit" value="Save" cssType="primary" />
              </div>
            </React.Fragment>
          )
        }
       
      </ValidatorForm>
    </div>
	);
};

PolicemanDetailForm.propTypes = {

};

export default PolicemanDetailForm;
