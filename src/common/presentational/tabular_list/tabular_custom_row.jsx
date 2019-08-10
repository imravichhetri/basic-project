import React from "react";
import Link from "react-router-dom/Link";

import ErrorBoundComponent from "../error_bound_component";

import "./styles.css";

export default class TabularCustomRow extends ErrorBoundComponent {

  _onClick = ( event ) => {
  	event.preventDefault()
  }

  _onDragStart = ( e ) => {
  	this.props.onDragStart( e, this.props.rowData )
  }
  _render =  () => {
  	const { defaultRowRenderer: DefaultRowRenderer,  href, ...props } = this.props;
  	if( href ) {
  		return (
        <Link
          className={ props.index % 2 === 0 ? `tabular_links_odd` : `tabular_links_even` }
          to={ href }
          onClick={ this.props.draggable && this._onClick }
          draggable={ this.props.draggable }
          onDragStart={ this.props.onDragStart && this._onDragStart } 
          onDragOver={ this.props.draggable && this.props.onDragOver }
          onDragEnd={ this.props.draggable && this.props.onDragEnd }
          onDragExit={ this.props.draggable && this.props.onDragExit }
          onDrag={ this.props.draggable && this.props.onDrag }
          onDragEnter={ this.props.draggable && this.props.onDragEnter }
          onDragLeave={ this.props.draggable && this.props.onDragLeave }
          onDrop={ this.props.draggable && this.props.onDrop }
          >
          <DefaultRowRenderer
            { ...props }
            />
        </Link>
  		);
  	} else {
  		return (
        <DefaultRowRenderer
          { ...props }
          draggable
          onDragStart={( e )=>{ this._onDragStart( e ) } } 
          className={ props.index % 2 === 0 ? `${ props.className } row_container_odd` : `${ props.className }` }
          />
  		)
  	}
  }
}
