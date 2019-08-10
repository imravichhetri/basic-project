import React from "react";
import {
	WindowScroller,
	AutoSizer,
 	defaultTableRowRenderer as DefaultTableRowRenderer
} from "react-virtualized";
import {
	isEqual as _IsEqual
} from "lodash";

import TabularList from "."
import ErrorBoundComponent from "../error_bound_component";
import Env from "../../utils/env";

const styles = {
	WindowScrollerWraper: "flex: 1 1 auto;"
}
export default class WindowScrollerTable extends ErrorBoundComponent {
	_setRef = windowScroller => {
		this._windowScroller = windowScroller;
	};
	state ={
		scrollToIndex: -1
	}

	_setTableRef = ( ref ) => {
		console.log( ref, "ref" )
		window.listEl = ref;
	}
	_content = () => {
		const styles={}
		const {customElement, isScrollingCustomElement, list} = this.context;
		const {scrollToIndex, showHeaderText} = this.state;
		console.log( this, { customElement, isScrollingCustomElement, list, scrollToIndex, showHeaderText } , "window_scroller_table _content" )
		return (
			 <WindowScroller
          ref={this._setRef}
          scrollElement={ isScrollingCustomElement ? customElement : window } 
          >
          { ( { height, isScrolling, registerChild, onChildScroll, scrollTop } ) => {
          	console.log( { height, isScrolling, registerChild, onChildScroll, scrollTop }	 )
          	return (
	            <AutoSizer disableHeight={true}>
              	{ ( { width } ) => (
			            	<TabularList
											{ ...this.props }
											scrollTop={ scrollTop }
			                height={ height }
			                width={ width }
			                /*isScrolling={ isScrolling }
			                onScroll={ onChildScroll }*/
			                overscanRowCount={ 2 }
											// rowClickHandler={this._rowClickHandler}
											rowHeight={ 60 }
											disableHeader={ false }
											data={ this.props.data }
											columnMeta={ this.props.columnMeta }
											rowRendererFunc={ this._rowRenderer }
											registerChild={ registerChild }
											onChildScroll={ onChildScroll }
											setRef={ this._setTableRef }
											disableHeight
											windowScroller
											/>
              	) }
	            </AutoSizer>
	          ) }
          }
        </WindowScroller>

		)
	}
	_render = () => {
		console.log( this, "window_scroller_table" )
		if( Env.isClient() ) {
			return (
				<React.Fragment>
					{ this._content() }
				</React.Fragment>
			)			
		}
		return;
	}
}