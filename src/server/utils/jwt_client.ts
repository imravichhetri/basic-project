import Jwt from 'jsonwebtoken';

import Config from '../../config';


const JwtClient = {
  generateUserAuthToken: ( userId: number ) => {
    return Jwt.sign( {
      userId
    }, Config.jwt_secret );
  },
  decodeToken: ( token: string ): object | string => {
    return Jwt.verify( token, Config.jwt_secret );
  }
};

export default JwtClient;
