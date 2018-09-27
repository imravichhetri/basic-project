import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import schema from "../graphql";
export const giqlExpress = graphiqlExpress({ endpointURL: "/graphql" });
export const gqlExpress = graphqlExpress(( req: any , res: any ) => {
	return {
		schema,
		context: {
			expressReq: req,
			expressRes: res,
			reqType: req.headers["auth-type"],
			user: req["auth-user"],
			// authToken: req.cookies.auth,
			session: req.session
		}
	};
});
