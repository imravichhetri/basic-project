import { GQC } from "graphql-compose";
import { forEach as _forEach } from "lodash";

import Queries from "./*/";

const initializeMutations = () => {
	try {
		const resolvers = {};
		Queries.forEach(schemaResolvers => {
			_forEach(schemaResolvers, (schemaResolver, key) => {
				resolvers[schemaResolver.name] = schemaResolver;
			});
		});
		GQC.rootMutation().addFields(resolvers);
	} catch (e) {
		console.log(e, "error");
	}
};
export default initializeMutations;
