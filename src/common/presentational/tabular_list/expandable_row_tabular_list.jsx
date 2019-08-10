import React from "react";
import {
 	defaultTableRowRenderer as DefaultTableRowRenderer
} from "react-virtualized";
import {
	isEqual as _IsEqual
} from "lodash";

import TabularList from "."
import ErrorBoundComponent from "../error_bound_component";

export default class ExpandableRowTabularList extends ErrorBoundComponent {
	shouldComponentUpdate ( nextProps, nextState ) {
		return !_IsEqual( nextProps, this.props ) && _IsEqual( nextState, this.state );
	}

	_rowRenderer = ( ...params ) => {
		console.log( params, "_rowRenderer" )
		return (
			"Ella"
		)
	};

	_render = () => {
		return (
			<React.Fragment>
				<TabularList
					{ ...this.props }
					// rowClickHandler={this._rowClickHandler}
					rowHeight={ 60 }
					disableHeader={ false }
					data={ this.props.data }
					columnMeta={ this.props.columnMeta }
					rowRendererFunc={ this._rowRenderer }
					/>
			</React.Fragment>
		);
	}
}
