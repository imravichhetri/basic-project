// tslint:disable
import _ from "lodash";
// import Mixin from 'lodash/mixin';
// import './index.d';
_.mixin( {
	valByKey: ( obj, key ) => {
		const keys = key.split( "." );
		let val = obj;
		for ( const i in keys ) {
			if ( val ) {
				val = val[keys[i]];
			} else {
				break;
			}
		}
		return val;
	},
	serialize: ( obj ) => {
		const str = [];
		for ( const p in obj ) {
			if ( obj.hasOwnProperty( p ) ) {
				str.push( `${encodeURIComponent( p )}=${encodeURIComponent( obj[p] )}` );
			}
		}
		return str.join( "&" );
	},
	diffObj: ( objectParam, baseParam ) => {
		const changes = ( object, base ) => _.transform( object, ( result, value, key ) => {
			if ( !_.isEqual( value, base[key] ) ) {
				result[key] = _.isObject( value ) && _.isObject( base[key] )
					? changes( value, base[key] )
					: value;
			}
		} );
		return changes( object, base );
	},
	assignObjectForKey: ( obj = {}, keyStr = "", value ) => {
		const keyArr = keyStr.trim().split( "." );
		let objVal = obj;
		const numberRegex = new RegExp( "^[0-9]+$" );
		for ( let i = 0; i < keyArr.length; i++ ) {
			const key = numberRegex.test( keyArr[i] )
				? parseInt( keyArr[i], 10 )
				: keyArr[i];
			const key2 = numberRegex.test( keyArr[i + 1] )
				? parseInt( keyArr[i + 1], 10 )
				: keyArr[i + 1];
			if ( !_.isUndefined( key ) && !_.isUndefined( key2 ) ) {
				if ( !objVal[key] ) {
					if ( _.isNumber( key2 ) ) {
						objVal[key] = [];
					} else {
						objVal[key] = {};
					}
				}
			} else if ( !_.isUndefined( key ) ) {
				objVal[key] = value;
			}
			objVal = objVal[key];
		}
		return obj;
	},
	move: ( array, moveIndex, toIndex ) => {
		const item = array[moveIndex];
		const { length } = array;
		const diff = moveIndex - toIndex;

		if ( diff > 0 ) {
			// move left
			return [
				...array.slice( 0, toIndex ),
				item,
				...array.slice( toIndex, moveIndex ),
				...array.slice( moveIndex + 1, length )
			];
		}
		if ( diff < 0 ) {
			// move right
			const targetIndex = toIndex + 1;
			return [
				...array.slice( 0, moveIndex ),
				...array.slice( moveIndex + 1, targetIndex ),
				item,
				...array.slice( targetIndex, length )
			];
		}
		return array;
	},
	fallbackCopyTextToClipboard: ( text ) => {
		const textArea = document.createElement( "textarea" );
		textArea.value = text;
		document.body.appendChild( textArea );
		textArea.focus();
		textArea.select();

		const successful = document.execCommand( "copy" );
		document.body.removeChild( textArea );
		return successful;
	},
	copyTextToClipboard: async ( text ) => {
		if ( !navigator.clipboard ) {
			return _.fallbackCopyTextToClipboard( text );
		}
		return navigator.clipboard.writeText( text );
	},
	secondsToPlaybackTime: ( duration ) => {
		const hours = Math.floor( duration / 3600 ).toString();
		const minutes = Math.floor( ( duration - +hours * 3600 ) / 60 ).toString();
		const seconds = Math.floor(
			duration - +hours * 3600 - +minutes * 60,
		).toString();
		const milliSeconds = ( duration % 1 )
			.toFixed( 3 )
			.toString()
			.split( "." )[1];
		return `${hours.length === 1 ? `0${hours}` : hours}:${
			minutes.length === 1 ? `0${minutes}` : minutes
		}:${seconds.length === 1 ? `0${seconds}` : seconds}.${milliSeconds}`;
	},
	playbackTimeToSeconds: ( playbackTime ) => {
		const duration = playbackTime.toString().split( "." );
		if ( duration[0].includes( ":" ) ) {
			const durationData = duration[0].split( ":", 3 );
			if ( durationData.length === 3 ) {
				return Math.round(
					durationData[0] * 60 * 60
            + durationData[1] * 60
            + durationData[2]
            + parseInt( duration[1], 10 ),
				);
			}
			return Math.round(
				durationData[0] * 60 + durationData[1] + parseInt( duration[1], 10 ),
			);
		}
		return Math.round( parseInt( duration[0], 10 ) + parseInt( duration[1], 10 ) );
	},
	clean: ( obj ) => {
		const newObj = _.cloneDeep( obj );
		for ( const propName in newObj ) {
			if ( newObj[propName] === null || newObj[propName] === undefined ) {
				_.unset( newObj, propName );
			}
		}
		return newObj;
	},
	sortByKeys: ( object ) => {
		const keys = Object.keys( object );
		const sortedKeys = _.sortBy( keys );

		return _.fromPairs( _.map( sortedKeys, key => [ key, object[key] ] ) );
	}
} );
