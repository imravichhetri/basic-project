import React from "react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import {
 	defaultTableRowRenderer as DefaultTableRowRenderer
} from "react-virtualized";
import _ from "lodash";

import TabularCustomRow from "./tabular_custom_row.jsx";
import TabularList from "./index.jsx"
import ErrorBoundComponent from "../error_bound_component";
import "./styles.css";


const SortableTableHOC = SortableContainer( TabularList, { withRef: true } );

const SortableItem = SortableElement( ( row ) => {
	const redirectLink="";
	const rowRenderer=null;
	return (
     	<TabularCustomRow
        href={ rowRenderer ? `${ redirectLink }/${row.rowData.id}` : null }
        defaultRowRenderer={ DefaultTableRowRenderer }
        { ...row }
        className="ReactVirtualized__Table__row view_container ant-card ant-card-bordered"
        />
	);
} );

export default class SortableTable extends ErrorBoundComponent {
	static propTypes = {
		disableHeader: PropTypes.bool,
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
		items: []
	}

	static getDerivedStateFromProps ( newProps, prevState ) {
		const stateObj = {};
		if( !prevState.defaultInitialized ) {
			stateObj.items = newProps.data;
			stateObj.defaultInitialized = true 
		} else if( prevState.items && !_.isEqual( newProps.data.length, prevState.items.length ) ) {
			stateObj.items = newProps.data;
		}
		return stateObj;
	};

	_onSortEnd = ( { oldIndex, newIndex } ) => {
		if ( oldIndex !== newIndex ) {
    	const items=  arrayMove( this.state.items, oldIndex, newIndex );
    	// console.log(items, 'items')
			this.setState( {
				items
			} );

			// We need to inform React Virtualized that the items have changed heights
			// const instance = this.sortableTableRef.refs.wrappedInstance;
			const instance = this.sortableTableRef.getWrappedInstance();
			// instance.Table.recomputeRowHeights();
			instance.tableRef.Grid.forceUpdate();
			instance.tableRef.forceUpdate();
		}
	};

  _rowRendererFunc = ( row ) => {
  	// const data = this.props.data[ row.index ];
  	return <SortableItem 
    	index={ row.index }
      className="custom_table_hoc_item"
    	{ ...row }
    	/>;
  };

  _headerRowRenderer = ( {
  	className,
  	columns,
  	style
  } ) => {
  	return (
      <div className={ `${ className } ant-card ant-card-bordered`} role="row" style={style}>
        {columns}
      </div>
  	)
  };
  
  _render = () => {
  	console.log( this, "sortable_table_hoc" )
  	return (
      <SortableTableHOC 
        ref={ ( instance ) => {
        	this.sortableTableRef = instance;
        }}
        data={ this.state.items }
        columnMeta={ this.props.columnMeta }
        headerRowRenderer={ this.props.customRowRenderer && this._headerRowRenderer }
        onSortEnd={ this._onSortEnd }
        disableHeader={ this.props.disableHeader === false ? false : true }
		    headerHeight={ this.props.headerHeight || 20 }
				rowHeight={ this.props.rowHeight || 50 }
				className="tabular_container"
        style={ {
        	height: "100%",
        	overflowY: "scroll"
        } }
        lockAxis={ this.props.lockAxis || "y" }
				rowClassName="view_container sortable_tabular_row_container"
		    rowCount={ this.state.sortedList && this.state.sortedList.length }
		    onRowClick={ this.props.rowClickHandler ? this.props.rowClickHandler : null }
		    rowRendererFunc={ this._rowRendererFunc }
        pressDelay={  0 }
		    disableSort
		    />
  	);
  }
}
