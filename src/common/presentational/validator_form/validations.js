import Validator from "validator";

const Validations = {
	required: ( val, err ) => {
		if ( !val ) {
			return err || "Required";
		}
		return "";
	},
	requiredArr: ( val, err ) => {
		if ( !val || !val.length ) {
			return err || "Required";
		}
		return "";
	},
	number: ( val, err ) => {
		const numberReg = new RegExp( "^[0-9]+$" );
		if ( !numberReg.test( val ) ) {
			return err || "Required to be number";
		}
		return null;
	},
	dateRangeRequired: ( val, err ) => {
		if ( !val.startDate || !val.endDate ) {
			return err || "Required";
		}
		return "";
	},
	isFloat: ( val, err ) => {
		if ( val && !Validator.isFloat( String( val ) ) ) {
			return err || "Should be in decimal";
		}
		return "";
	},
	isInteger: ( val, err ) => {
		if ( val && !Validator.isInt( String( val ) ) ) {
			return err || "Should be integer";
		}
		return "";
	},
	rteRequired: ( val, err ) => {
		if (
			!val
				.getEditorState()
				.getCurrentContent()
				.hasText()
		) {
			return err || "Required";
		}
		return "";
	},
	email: ( val, err ) => {
		if ( !val || !Validator.isEmail( val.trim() ) ) {
			return err || "Email required";
		}
		return "";
	},
	isJSON: ( val, err ) => {
		if ( val && !Validator.isJSON( val.trim() ) ) {
			return err || "Value needs to be JSON";
		}
		return "";
	}
};

export default Validations;
