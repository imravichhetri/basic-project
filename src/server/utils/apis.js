import axios from "axios";

import { usersGithub } from "../config/urls";

module.exports = {
	getUserDetails: function(username) {
		return axios.get(`${usersGithub}/${username}`);
	}
};
