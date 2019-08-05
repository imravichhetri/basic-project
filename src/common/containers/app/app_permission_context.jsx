import React from "react";
import _ from "lodash";

const AppPermissionContext = React.createContext( {
	selectedAccount: {}
} );

const AppPermissionContextDecor = ( Component ) => {
	return  function ContextWrapper ( props )  {
		return (
      <AppPermissionContext.Consumer>
        {
          ( context ) => (
            <Component
              { ...props }
              { ...context }
              />
          )
        }
      </AppPermissionContext.Consumer>
		);
	};
};

function CheckPermission ( permission ) {
	return _.includes( this, permission );
};

export {
	AppPermissionContextDecor,
	CheckPermission
};

export default AppPermissionContext;
