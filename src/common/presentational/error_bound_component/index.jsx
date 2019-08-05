import React from "react";


export default class ErrorBoundComponent extends React.Component  {
	constructor ( cArgs ) {
		super( cArgs );

		this.state = {
			__hasError__: false
		};

		( this ).__setState = this.setState;

		this.setState = ( ...args ) => {
			try{
				if ( !( this ).didUnmount ){
					( this ).__setState( ...args );
				}
			} catch ( e ){
				console.error( e );
			}
		};
	}

	componentWillUnmount () {
		( this ).didUnmount = true;
	}

	componentDidCatch ( err , info ) {
		console.error( err );
		console.log( info );
		if ( !this.state.__hasError__ ){
			this.setState( { __hasError__: true } );
		}
	}

  _getGraphQLError = ( errorObject ) => {
  	return errorObject.graphQLErrors[ 0 ].message;
  }

  _errorComponent = () => (
  	( this.props ).errorHandlerComponent ? (
  		this.props.errorHandlerComponent
  	) : (
      <div
        className='full_width'
        >
      <p
        style={ {
        	textAlign: "center"
        } }
        >
       Oops! Something went wrong!
      </p>
      {/*Help us improve your experience by sending an error report*/}
      </div>
  	)
  );

  _render = () => null;

  render () {
  	if ( this.state.__hasError__ ){
  		return this._errorComponent();
  	}

  	try {
  		return this._render();
  	} catch ( e ) {
  		console.error( e );
  		return this._errorComponent();
  	}
  }
}
