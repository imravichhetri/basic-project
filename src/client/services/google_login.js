import Axios from "axios";

const GoogleLogin = ( credentials ) => Axios.post( "/auth/google-login", credentials );

export default GoogleLogin;
