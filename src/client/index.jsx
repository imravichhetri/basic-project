import React from "react";
import ApolloProvider from "react-apollo/ApolloProvider";
import {
	hydrate as Hydrate
} from "react-dom";

import Loadable from "react-loadable";

// import "react-select/dist/react-select.css";
// import "react-virtualized-select/styles.css";
// import "../../node_modules/antd/dist/antd.css";
import App from "../common/containers/app";
import "../common/utils/lodash_mixins";
import "./index.css";
import ApolloClient from "./utils/apollo_client";


Loadable.preloadReady().then( () => (
	Hydrate(
		(
      <ApolloProvider
        client={ ApolloClient }
        >
        <App/>
      </ApolloProvider>
		),
		document.getElementById( "application" )
	)
) ).catch( e => {
	console.error( e, "error" )
} );
