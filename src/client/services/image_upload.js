import Axios from "axios";

const CustomImageUploadService = ( data, SuccessFunc, ErrFunc, initFunc, curryCancelFunc, setProgressStatus ) => {
	// console.log(args)
	const CancelToken = Axios.CancelToken;
	!!initFunc && initFunc();
	Axios( {
		method: "post",
		url: "/upload/image",
		data,
		cancelToken: new CancelToken( cancelFunc => {
			!!curryCancelFunc && curryCancelFunc( cancelFunc );
		} ),
		onUploadProgress: ( progressEvent ) => {
			const currentStatus = Math.round( progressEvent.loaded / progressEvent.total * 100 );
			!!setProgressStatus && setProgressStatus( currentStatus )
		}
	} )
		.then( data => {
			console.log( {data} )
			// if ( data && data.data && data.data.data ) {
			SuccessFunc( data.data )
		// }
		} )
		.catch( e => {
			console.log( e )
			ErrFunc( args )
		} )
}

export default CustomImageUploadService;