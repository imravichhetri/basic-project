import React from "react";

export default class ErrorBoundPureComponent extends React.PureComponent {
	constructor ( cArgs ) {
		super( cArgs );

		this.__setState = this.setState;
		this.setState = ( ...args ) => {
			try {
				if ( !this.didUnmount ){
					this.__setState( ...args );
				}
			} catch ( e ){
				console.error( e );
			}
		};
	}

  state = {};

  componentWillUnmount () {
  	this.didUnmount = true;
  }

  componentDidCatch ( err, info ) {
  	console.error( err );
  	console.log( info );
  	if ( !this.state._hasError ){
  		this.setState( { _hasError: true } );
  	}
  }

  _getGraphQLError = ( errorObj ) => {
  	return errorObj.graphQLErrors[ 0 ].message
  }

  _errorComponent = () => (
  	this.props.errorComponent ? (
  		this.props.errorComponent
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

  render () {
  	if ( this.state._hasError ){
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
