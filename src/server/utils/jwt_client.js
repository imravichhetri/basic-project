import Jwt from "jsonwebtoken";

import Config from "../../config";


const JwtClient = {
	generateUserAuthToken: ( data ) => Jwt.sign(
		data,
		Config.jwt_secret,
	),
	decodeToken: token => Jwt.verify( token, Config.jwt_secret )
};

export default JwtClient;
