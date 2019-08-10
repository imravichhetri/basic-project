import React from "react";

import ValidatorForm, {
	TextField,
	Select
} from "../../presentational/validator_form";

const SearchForm = () => {
	const _onSubmit = ( ...data ) => { console.log( data, "data" ); };
	return (
    <div>
      <ValidatorForm
        onSubmit={_onSubmit}
        >
        <TextField
          field="name"
          placeholderLabel="Name"
          required
          />
        <Select
          options={[ { label: "Random", value: "random" }, { label: "Trending", value: "trending" } ]}
          field="genre"
          required
          />
        <input type="submit" value="Submit" cssType="primary"/>
      </ValidatorForm>
    </div>
	);
};

export default SearchForm;
