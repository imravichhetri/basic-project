import Loadable from "react-loadable";
// import RouteLoader from "../presentational/loader/index.jsx";

const SearchLoadable = Loadable( {
	loader: () => ( import( "../presentational/search_home" ) ),
	loading: () => ( "Loading" )
} );

export default SearchLoadable;
