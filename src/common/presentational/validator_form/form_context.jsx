import React from "react";
// import * as Recompose from 'recompose';

const FormContext = React.createContext( {
	addValidatorToForm: () => {},
	deleteValidatorFromForm: () => {},
	disabled: false
} );

const FormContextItem= ( Component ) => {
	return function WrappedHOC ( props ) {
		return (
			<FormContext.Consumer>
				{
          ( context ) => (
	<Component
		{ ...context }
		{ ...props }
		/>
          )
        }
			</FormContext.Consumer>
		);
	};
};

export {
	FormContextItem
};

export default FormContext;
