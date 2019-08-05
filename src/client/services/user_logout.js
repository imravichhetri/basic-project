import Axios from "axios";

const Logout = () => Axios.get( "/auth/logout" );

export default Logout;
