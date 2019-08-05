import Axios from "axios";

const VideoUpload = async ( video ) => {
	const data = new FormData();

	data.append( "videoFile", video );
	return Axios.post( "/apis/upload/video", data, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	} );
};

export default VideoUpload;
