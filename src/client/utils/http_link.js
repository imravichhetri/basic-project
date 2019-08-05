import { HttpLink } from "apollo-link-http";

export default new HttpLink( {
	credentials: "include",
	headers: {
		"Auth-Type": "session"
	}
} );
