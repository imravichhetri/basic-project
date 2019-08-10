const mongoose = require( "mongoose" );


const CarSchema = new mongoose.Schema( {
	number: {
		type: String,
		required: true,
		unique:true
	},
	model: {
		type: String,
		required: true
	},
	brand: {
		type: String,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	assignedPoliceId: {
		type: String
	},
	status: {
		type: String,
		default: "PENDING"
	},
	createdTime: {
		type: Date,
		default: Date.now
	}
	/*  language: {
    type: String,
    required: true
  } */
} );

CarSchema.statics = {
	report: function ( data, callback ) {
		var log = new this( data );
		return log.save();
	},
	fetch: function ( query ) {
		try {
			return this.find( query, { __v: 0 } ).sort( { _id: 1 } );
		} catch ( e ) {
			console.log( e, "error" );
		}
	},
	getByNumber: function ( number ) {
		console.log( number, "number" );
		return this.findOne( {number}, { _id: 0, field6: 0 } ).sort( { _id: 1 } );
	},
	assignPolice: function ( obj ) {
		return this.findOneAndUpdate( { number: obj.number }, { assignedPoliceId: obj.username } );
	},
	getUnassignedCases: function () {
		return this.find( { status:"PENDING" }, { _id: 0, __v: 0 } ).sort( { _id: 1 } ).lean();
	},
	markResolved: function ( obj ) {
		return this.findOneAndUpdate( { number: obj.number }, obj );
	},
	delete: function ( param ) {
		console.log( "param", param );
		return this.remove( { id: param } );
	}
};

const Car = mongoose.model( "Car", CarSchema );
module.exports = Car;

/*db.getCollection('delayreportlogs').aggregate([{$lookup:{from:'alldelayedcrawlings',localField:'itemId',foreignField:'item_id',as:'output'}},{$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:["$output",0]},"$$ROOT"]}}},{$project:{output:0}}])*/
