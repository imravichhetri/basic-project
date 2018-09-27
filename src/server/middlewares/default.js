import React from "react";
import ReactDOM from "react-dom/server";

import Html from "../../universal/Html";
import SplashScreen from "../../universal/SplashScreen";

export const defaultResponse = (req, res) => {
	const html = (
		<Html jsFileUrl={res.originalUrl}>
			<SplashScreen />
		</Html>
	);
	res.status(200);
	res.send(`<!doctype html>${ReactDOM.renderToString(html)}`);
	res.end();
};
