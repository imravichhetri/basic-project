import ConsoleStamp from "console-stamp";
import Loadable from "react-loadable";

import "../common/utils/lodash_mixins";
import Config from "../config";
import WebappServer from "./utils/webapp_server";
// import {scheduleSnapshotGenerationJobs as ScheduleSnapshotGenerationJobs} from "../crons/snapshots/snapshot_generation_scheduler";

// import {getItemsBySnapshotId as GetItemsBySnapshotId} from "./services/snapshots/snapshot_service";

// import "./services/content_source_config_service"
ConsoleStamp( console, { pattern: " dd-mm-yyyy HH:MM:ss " } );

/* const app = Express();
const PORT = 4000; */

const webappServer = new WebappServer();

Loadable.preloadAll()
	.then( () => {
		webappServer.runServer( Config.webapp_port );
	} )
	.catch( ( e ) => {
		console.log( "Error occurred", e );
	} );

// ScheduleSnapshotGenerationJobs();
// GetItemsBySnapshotId( "867b2253-641c-4acb-84b7-b750f4933a11" );

