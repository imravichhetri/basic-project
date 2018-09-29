import Axios from 'axios';

interface ICredentials {
	googleId: string;
	accessToken: string;
}

const GoogleLogin  = ( credentials: ICredentials ) => {
  return Axios.post( '/auth/google-login', credentials );
};

export default GoogleLogin;
