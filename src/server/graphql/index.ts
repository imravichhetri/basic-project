import { GQC } from "graphql-compose";
import { default as initializeMutations }  from "./mutations";
import { default as initializeQueries }  from "./queries";

initializeQueries();
initializeMutations();

export default GQC.buildSchema();
