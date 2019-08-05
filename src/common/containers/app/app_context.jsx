import React from "react";

const AppContext = React.createContext( {
	currentUser: {}
} );

const AppContextDecor = ( Component ) => {
	return function ContextWrapper ( props ) {
		return (
			<AppContext.Consumer>
				{
          ( context ) => (
	<Component
		{ ...props }
		{ ...context }
		/>
          )
        }
			</AppContext.Consumer>
		);
	};
};

export {
	AppContextDecor
};

export default AppContext;