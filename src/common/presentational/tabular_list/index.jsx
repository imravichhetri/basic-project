import React from "react";
import PropTypes from "prop-types";
import {
 	Table,
 	Column,
 	AutoSizer,
 	defaultTableRowRenderer as DefaultTableRowRenderer
} from "react-virtualized";
import _ from "lodash";
/* import {
	Input
} from "antd"; */

import BoundComponent from "../error_bound_component/index.jsx";
import TabularCustomRow from "./tabular_custom_row.jsx";
import SortIndicator from "./sort_indicator.jsx";
import SortDirection from "../../enums/sort_direction";
import "./styles.css";

/**
 * @prop {string} name
 * @prop {boolean} disableHeader
 * @prop {boolean} showSearchbox
 * @prop {number} headerHeight
 * @prop {number} rowHeight
 * @prop {Object[]} data
 * @prop {Object[]} columnMeta
 * @prop {function} rowClickHandler
 * @prop {string} redirectLink
 * @prop {boolean} rowRenderer
 */
export default class TabularList extends BoundComponent {
	static propTypes = {
		name: PropTypes.string,
		disableHeader: PropTypes.bool,
		showSearchbox: PropTypes.bool,
		headerHeight: PropTypes.number,
		rowHeight: PropTypes.number,
		data: PropTypes.array.isRequired,
		columnMeta: PropTypes.array,
		rowClickHandler: PropTypes.func,
		redirectLink: PropTypes.string,
		rowRenderer: PropTypes.bool
	};

	state = {
		defaultInitialized: false,
		sortedList: [],
		searchedValue: ""
	};

	static getDerivedStateFromProps ( newProps, prevState ) {
		const stateObj = {};
		if ( !prevState.defaultInitialized ) {
			stateObj.defaultInitialized = true;

			if ( !newProps.disableSort ) {
				stateObj.sortedList = newProps.data;
				stateObj.sortBy = newProps.sortBy ? newProps.sortBy : "id";
				stateObj.sortDirection = newProps.sortDirection ? newProps.sortDirection : SortDirection.ASC;
			} else {
				stateObj.sortedList = newProps.data;
			}
		} else if ( newProps.data.length && ( !_.isEqual( newProps.data, prevState.sortedList ) ) ) {
			const sortedList = prevState.sortDirection === "DESC" ? _.sortBy( newProps.data, item => item[prevState.sortBy] ).reverse() : _.sortBy( newProps.data, item => item[prevState.sortBy] );
			stateObj.sortedList = _.filter( sortedList, ( rowData, rowIndex ) => {
				/*return _.some( obj, ( value, key ) => 	{
					return new RegExp( prevState.searchedValue, "i" ).test( value )
				} ) */
				const check = _.some( newProps.columnMeta, ( meta, columnIndex ) => {
					const cellData = _.valByKey( rowData, meta.dataKey );
					if ( _.isArray( cellData ) ) {
						return _.some( cellData, element => {
							if ( element ) {
								const ele = element.toString();
								return ele.toLowerCase().includes( prevState.searchedValue.toLowerCase() );
							}
						} );
					} else {
						const data = meta.cellRenderer ? meta.cellRenderer( { cellData, rowData, dataKey: meta.dataKey, columnIndex, rowIndex, isScrolling: rowData.isScrolling } ) : _.valByKey( rowData, meta.dataKey );
						const val = new RegExp( prevState.searchedValue, "i" ).test( data );
						return val;
					}
				} );
				return check;
			} );
		} /*else if( _.isArray( newProps.data ), _.isArray( prevState.sortedList ) && newProps.data.length === prevState.sortedList.length ) {

		}*/
		if ( newProps.data.length === 0 ) {
			stateObj.sortedList = [];
		}
		return stateObj;
	};

	componentDidMount () {
		if ( this.props.defaultSortDirection ) {
			this._sort( { defaultSortDirection: "", event: "", sortBy: this.state.sortBy ? this.state.sortBy : "id", sortDirection: this.props.defaultSortDirection } );
		}
	}

	_sortList = ( { sortBy, sortDirection } ) => {
		if ( this.state.sortedList ) {
			const sortedList = _.sortBy( this.state.sortedList, item => item[sortBy] );
			return sortDirection === SortDirection.DESC ? _.reverse( sortedList ) : sortedList;
		}
	};

	_headerRenderer = ( { label, sortBy, dataKey, sortDirection, ...props } ) => {
		return (
			<React.Fragment>
				{label}
				{
					sortBy === dataKey &&
					<SortIndicator
						sortDirection={sortDirection}
						/>
				}
			</React.Fragment>
		);
	}
	_sort = ( { defaultSortDirection, event, sortBy, sortDirection } ) => {
		const sortedList = this._sortList( { sortBy, sortDirection } );
		this.setState( { sortBy, sortDirection, sortedList } );
	};

	_getDatum = ( list, index ) => {
		return list.get( index % list.size );
	};

	_tabularBody = () => {
		return _.map( this.props.columnMeta, ( { sortable = false, ...rest }, index ) => {
			return ( <Column
				key={index}
				{...rest}
				disableSort={!sortable}
				/>
			);
		} );
	};

	_noDataRenderer = () => (
		<div>
			No Data Found.
  	</div>
	)

	_tableContainer = ( { height, width } ) => (
		<Table
			ref={r => ( this.tableRef = r )}
			disableHeader={this.props.disableHeader === false ? false : true}
			width={width}
			height={height}
			headerHeight={this.props.headerHeight || 20}
			headerRowRenderer={this.props.headerRowRenderer}
			headerClassName={this.props.headerClassName}
			rowHeight={this.props.rowHeight || 50}
			className="tabular_container"
			rowClassName={`view_container`}
			rowCount={this.state.sortedList && this.state.sortedList.length}
			rowGetter={( { index } ) => this.state.sortedList[index]}
			onRowClick={this.props.rowClickHandler ? this.props.rowClickHandler : null}
			sort={this._sort}
			sortBy={this.state.sortBy}
			sortDirection={this.state.sortDirection}
			rowRenderer={this.props.rowRendererFunc ? this.props.rowRendererFunc : ( row ) => {
				return (
					<TabularCustomRow
						href={this.props.rowRenderer ? `${this.props.redirectLink}/${row.rowData.id}` : null}
						defaultRowRenderer={DefaultTableRowRenderer}
						draggable={this.props.draggable}
						onDragStart={this.props.draggable && this.props.onDragStart}
						onDragOver={this.props.draggable && this.props.onDragOver}
						onDragEnd={this.props.draggable && this.props.onDragEnd}
						onDragExit={this.props.draggable && this.props.onDragExit}
						onDrag={this.props.draggable && this.props.onDrag}
						onDragEnter={this.props.draggable && this.props.onDragEnter}
						onDragLeave={this.props.draggable && this.props.onDragLeave}
						onDrop={this.props.draggable && this.props.onDrop}
						className={this.props.rowClassName}
						{...row}
						/>
				);
			}}
			>
			{
				this._tabularBody()
			}
		</Table>
	);

	/* _tableTools = () => (
		<div className="table_tools_container">
			<Input.Search
				placeholder="Search"
				onSearch={this._filterList}
				style={{ width: 200 }}
				key={`search_${new Date().getMilliseconds()}`}
				autoFocus
				/>
		</div>
	); */

	_filterList = ( searchedValue ) => {
		// const filteredList = _.filter( this.props.data, obj => { 
		// 	return _.some( obj, ( value, key ) => 	{
		// 		return new RegExp( searchedValue, "i" ).test( value )
		// 	} ) 
		// } );

		const filteredList = _.filter( this.props.data, ( rowData, rowIndex ) => {
			const check = _.some( this.props.columnMeta, ( meta, columnIndex ) => {
				const cellData = _.valByKey( rowData, meta.dataKey );
				if ( _.isArray( cellData ) ) {
					return _.some( cellData, element => {
						if ( element ) {
							const ele = element.toString();
							return ele.toLowerCase().includes( searchedValue.toLowerCase() );
						}
					} );
				} else {
					const data = meta.cellRenderer ? meta.cellRenderer( { cellData, rowData, dataKey: meta.dataKey, columnIndex, rowIndex, isScrolling: rowData.isScrolling } ) : _.valByKey( rowData, meta.dataKey );
					const val = new RegExp( searchedValue, "i" ).test( data );
					return val;
				}
			} );
			return check;
		} );
		this.setState( { sortedList: filteredList, searchedValue } );
	}

	/*_tableContainer = () => (
		<React.Fragment>
			<AutoSizer>
				{
					( { height, width } ) => (
						<Table
							disableHeader={ this.props.disableHeader === false ? false : true }
					    width={ width }
					    height={ height }
					    headerHeight={ this.props.headerHeight || 20 }
	    				rowHeight={ this.props.rowHeight || 50 }
	    				className="tabular_container"
							rowClassName="view_container row_container"
					    rowCount={ this.state.sortedList && this.state.sortedList.length }
					    rowGetter={ ( { index } 	) => this.state.sortedList[ index ] }
					    onRowClick={ this.props.rowClickHandler ? this.props.rowClickHandler : null }
					    rowRenderer={ ( row ) => {
                return (
                  <TabularCustomRow
                    href={ this.props.rowRenderer ? `${ this.props.redirectLink }/${row.rowData.id}` : null }
                    defaultRowRenderer={ DefaultTableRowRenderer }
                    { ...row }
                    />
                );
					    } }
					  	>
					  	{
					  		_.map( this.props.columnMeta, ( props , index ) => {
					  			return ( <Column key={ index }  { ...props } /> );
					  		} )
					  	}
						</Table>
					)
				}
	  	</AutoSizer>
		</React.Fragment>
	);*/

	_render = () => {
		if ( !_.isEmpty( this.props.data ) ) {
			return (
				<div className="fill_parent">
					{
						// this.props.showSearchbox && this._tableTools()
					}
					<div style={this.props.showSearchbox ? { height: "calc(100% - 1em)", width: "100%" } : { height: "100%", width: "100%" }}>
						<AutoSizer>
							{
								( { height, width } ) => {
									return this._tableContainer( { height, width } );
								}
							}
						</AutoSizer>
					</div>
				</div>
			);
		} else {
			return (
				<div className="tabular_no_data">
					No Data Found
				</div>
			);
		}
	}
}

