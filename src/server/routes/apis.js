import { Router as router } from "express";

import Car from "../mongo/collections/car";
import Police from "../mongo/collections/police";
// const carMiddleware = require("./apis_car");
// const policeMiddleware = require(  "./apis_police" );

const Router = router();

/* police routes. */
Router.get( "/police/:id", function ( req, res, next ) {
	console.log( req );
	res.send( "respond with a resource" );
} );
Router.post( "/police/create", async ( req, res, next ) => {
	const body = req.body;
	console.log( body, "body" );
	try {
		const resp = await Police.create( body );
		res.status( 200 ).send( resp );
	} catch ( e ) {
		console.error( e, "while reporting car" );
		// throw new Error( e.message );
		res.status( 500 ).send( e.message );
	}
} );
Router.post( "/police/see-case", async ( req, res, next ) => {
	const body = req.body;
	console.log( req.body, "body" );
	try {
		const resp = await Police.fetch( { username: body.username, password: body.password } );
		res.status( 200 ).send( resp );
	} catch ( e ) {
		console.error( e, "while reporting car" );
		// throw new Error( e.message );
		res.status( 500 ).send( e.message );
	}
} );
Router.get( "/polices", async ( req, res, next ) => {
	console.log( req );
	try {
		const police = await Police.fetchAll();
		res.send( { police } );
	} catch ( e ) {
		// throw new Error( e.message );
		res.status( 500 ).send( e.message );
	}
} );


/*  car routes. */
Router.use( "/car/:number", async ( req, res, next ) => {
	const { number } = req.params;
	try {
		const car = await Car.getByNumber( number );
		res.send(  car  );
	} catch ( e ) {
		// throw new Error( e.message );
		res.status( 500 ).send( e.message );
	}
} );
Router.use( "/cars", async ( req, res, next ) => {
	try {
		const cars = await Car.fetch();
		res.send( { cars } );
	} catch ( e ) {
		// throw new Error( e.message );
		res.status( 500 ).send( e.message );
	}
} );

Router.use( "/car/report", async ( req, res, next ) => {
	const body = req.body;
	console.log( body, "body" );
	try {
		const resp = await Car.report( body );
		res.status( 200 ).send( resp );
	} catch ( e ) {
		console.error( e, "while reporting car" );
		// throw new Error( e.message );
		res.status( 500 ).send( e.message );
	}
} );






export const url = "/apis";
export const route = Router;
