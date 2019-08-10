import React from "react";

const DashboardContext = React.createContext( {
	currentUser: {}
} );

const DashboardContextDecor = ( Component ) => {
	return function ContextWrapper ( props ) {
		return (
			<DashboardContext.Consumer>
				{
          ( context ) => (
					<Component
						{ ...props }
						{ ...context }
						/>
          )
        }
			</DashboardContext.Consumer>
		);
	};
};

export {
	DashboardContextDecor
};

export default DashboardContext;