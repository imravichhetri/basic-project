import { GQC } from "graphql-compose";
import initializeMutations from "./mutations";
import initializeQueries from "./queries";

initializeQueries();
initializeMutations();

export default GQC.buildSchema();
