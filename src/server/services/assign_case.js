const Car = require( "../mongo/collections/car" );
const Police = require( "../mongo/collections/police" );
const _ = require( "lodash" );
export const assignCase = async () => {
	let minValue = 0;
	const unassignedCars = await Car.getUnassignedCases();
	const unassignedOfficers = await Police.getUnassignedOfficers();
	if ( unassignedOfficer.length > unassignedCars.length ) {
		minValue = unassignedCars.length;
	} else {
		minValue = unassignedOfficers.length;
	}
	const carArrayPromise = _.map( Array( minValue ), ( val, index ) => {
		const carObj = unassignedCars[index];
		const policeObj = unassignedPolice[ index ];
		try{
			return Car.assignPolice( { number: carObj.number, status:"ASSIGNED", assignedPoliceId: policeObj.username } );
		} catch( e ) {
			console.error( "Error While assigning police to car" );
		}
	} );
	const policeArrayPromise = _.map( Array( minValue ), ( val, index ) => {
		const carObj = unassignedCars[index];
		const policeObj = unassignedPolice[index];
		try{
			return Police.assignCar( { currentAssignedCase: carObj.number, username: policeObj.username } );
		} catch ( e ) {
			console.error( "Error While assigning car to police" );
		}
	} );
	return await Promise.all( [ ...carArrayPromise, ...policeArrayPromise ] );
};

export const AssignCaseOnCarRequest = async ( carObj ) => {
	const unassignedOfficers = await Police.getUnassignedOfficers();
	if( !_.isEmpty( unassignedOfficers ) ) {
		const policeObj = unassignedOfficers[ 0 ];
		carObj.assignedPoliceId = policeObj.username;
		carObj.status = "ASSIGNED";
		policeObj.currentAssignedCase = carObj.number;
		policeObj.lastUpdateTime = new Date();
		const promiseArray=[];
		promiseArray.push( Car.report( carObj ) );
		promiseArray.push( Police.assignCar( policeObj ) );
		try {
			const data = await Promise.all(  promiseArray );
			return data[ 0 ];
			console.log( data, "data" );
		} catch( e ){
			throw new Error( e.message );
		}
	} else {
		carObj.status = "PENDING";
		return await Car.report( carObj );
	}
};

export const AssignCaseOnCaseResolved = async ( policeObj ) => {
	await Car.markResolved( { number: policeObj.number, status: policeObj.status } );
	const unassignedCars = await Car.getUnassignedCases();
	console.log( policeObj , "policeObj" );
	if ( !_.isEmpty( unassignedCars ) ) {
		const carObj = unassignedCars[0];
		debugger;
		carObj.assignedPoliceId = policeObj.username;
		carObj.status = "ASSIGNED";
		policeObj.currentAssignedCase = carObj.number;
		policeObj.lastUpdateTime = new Date();
		delete policeObj.number;
		const promiseArray = [];
		promiseArray.push( Car.assignPolice( carObj ) );
		promiseArray.push( Police.assignCar( policeObj ) );
		try {
			const data = await Promise.all( promiseArray );
			return data[0];
			console.log( data, "data" );
		} catch ( e ) {
			throw new Error( e.message );
		}
	} else {
		policeObj.currentAssignedCase = null;
		const promiseArray = [];
		promiseArray.push( Police.assignCar( policeObj ) );
		try {
			const data = await Promise.all( promiseArray );
			return data[0];
			console.log( data, "data" );
		} catch ( e ) {
			throw new Error( e.message );
		}
	}
};