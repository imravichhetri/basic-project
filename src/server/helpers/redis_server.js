import IORedis from "ioredis";
import Config from "../../config";

export default class RedisServer {
	runServer = () => {
	  const cluster = new IORedis.Cluster( [ Config.redis_host ] );
	  cluster.on( "connect", () => {
	    console.log( "REDIS CONNECT" );
	  } );
	  cluster.on( "error", ( err ) => {
	    console.log( `REDIS CONNECT error  ${err}` );
	    console.log( "node error", err.lastNodeError );
	  } );
	}
}
