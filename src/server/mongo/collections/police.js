const mongoose = require( "mongoose" );


const PoliceSchema = new mongoose.Schema( {
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String
	},
	password: {
		type: String
	},
	currentAssignedCase: {
		type: String
	},
	createdTime: {
		type: Date,
		default: Date.now
	},
	lastUpdateTime: {
		type: Date,
		default: Date.now
	}
	/*  language: {
     type: String,
     required: true
   } */
} );

PoliceSchema.statics = {
	create: function ( data, callback ) {
		var log = new this( data );
		return log.save();
	},
	fetchAll: function () {
		try {
			return this.find( {}, { __v: 0 } ).sort( { _id: 1 } );
		} catch ( e ) {
			console.log( e, "error" );
		}
	},
	fetch: function ( query ) {
		try {
			return this.findOne( query, { __v: 0 } ).sort( { _id: 1 } );
		} catch ( e ) {
			console.log( e, "error" );
		}
	},
	getUnassignedOfficer: function ( number ) {
		return this.findOne( { currentAssignedCase: null }, { _id: 0, field6: 0 } ).sort( { _id: 1 } );
	},
	assignCar: function ( obj ) {
		return this.findOneAndUpdate( { username: obj.username }, { currentAssignedCase: obj.currentAssignedCase } );
	},
	getUnassignedOfficers: function () {
		return this.find( { currentAssignedCase: null }, { __v: 0 } ).sort( { lastUpdateTime: -1 } );
	},
	delete: function ( param ) {
		console.log( "param", param );
		return this.remove( { id: param } );
	}
};

const Police = mongoose.model( "Police", PoliceSchema );
module.exports = Police;

/*db.getCollection('delayreportlogs').aggregate([{$lookup:{from:'alldelayedcrawlings',localField:'itemId',foreignField:'item_id',as:'output'}},{$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:["$output",0]},"$$ROOT"]}}},{$project:{output:0}}])*/
