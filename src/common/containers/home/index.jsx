import React from "react";
import {
	graphql as Graphql,
	compose as Compose
} from "react-apollo";
import {
	get as _Get
} from "lodash";

import ErrorBoundComponent from "../../presentational/error_bound_component";
import TabularList from "../../presentational/tabular_list";
import GetAllCases from "../../graphql/queries/get_all_case.graphql";

@Compose(
	Graphql(
		GetAllCases,
		{
			name: "getAllCases"
		}
	)
)
export default class Home extends ErrorBoundComponent {

  _columnMeta = [
  	{
  		label: "Number",
  		dataKey: "number",
  		width: 50,
  		flexGrow: 4,
  		sortable: true
  	},
  	{
  		label: "Model",
  		dataKey: "model",
  		width: 50,
  		flexGrow: 4
  	},
  	{
  		label: "Brand",
  		dataKey: "brand",
  		width: 50,
  		flexGrow: 4
  	},
  	{
  		label: "Color",
  		dataKey: "color",
  		width: 50,
  		flexGrow: 4
  	},
  	{
  		label: "Status",
  		dataKey: "status",
  		width: 50,
  		flexGrow: 4,
  		sortable: true
  	}
  ];

  _content = () => {
  	return (
			<div
				style={{ height: "100%", overflowY: "auto" } }
				>
				<TabularList
					rowClickHandler={this._rowClickHandler}
					disableHeader={false}
					data={ _Get( this.props.getAllCases, "GetAllCases" ) || [] }
					columnMeta={this._columnMeta}
					showSearchbox
					/> 
			</div>	
  	);
  }
  _render = () => {
  	console.log( this, "app" );
  	if ( this.props.getAllCases.loading ) {
  		return (
				<div
					className="center_item"
					>
					Loading
				</div>
  		);
  	}
  	if ( this.props.getAllCases.error ) {
  		return (
				<div>
					Error occured while loading Content...
        </div>
  		);
  	}
  	return (
      <div
        className="view_container fill_parent"
        >
        { this._content() }
      </div>
  	);
  }
}