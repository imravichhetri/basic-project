import Jwt from 'jsonwebtoken';

import { default as Config } from '../../config';

console.log( Config, 'config' );

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
