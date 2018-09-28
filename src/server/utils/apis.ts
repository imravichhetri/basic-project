import axios from "axios";

import { usersGithub } from "../config/urls";

export const	getUserDetails = ( username:string ) => {
		return axios.get( `${usersGithub}/${username}` );
};
