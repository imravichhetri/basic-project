
import Express from "express";

export default class WebServer {
	constructor ( ...args ) {
		( this ).app = Express();
	}

  runServer = ( port = 4000 ) => {
  	this.app.listen( port, () => {
  		console.log( "Application running", `PORT: ${port}` );
  	} );
  }
}
