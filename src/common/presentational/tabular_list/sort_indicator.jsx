import cn from "classnames";
import PropTypes from "prop-types";
import  React from "react";

import SortDirection from "../../enums/sort_direction"


export default class SortIndicator extends React.Component{

  static propTypes = {
  	sortDirection: PropTypes.string
  }
  static getDerivedStateFromProps ( newProps ) {
  	const classNames = cn( "ReactVirtualized__Table__sortableHeaderIcon", {
  		"ReactVirtualized__Table__sortableHeaderIcon--ASC":
         newProps.sortDirection === SortDirection.ASC,
  		"ReactVirtualized__Table__sortableHeaderIcon--DESC":
         newProps.sortDirection === SortDirection.DESC
  	} );   
  	return {
  		classNames
  	} 
  }

  render () {
  	return (
      <svg 
        className={ this.state.classNames } 
        width={ 18 } 
        height={ 18 } 
        viewBox="0 0 24 24"
        >
        { 
          this.props.sortDirection === SortDirection.ASC ? (
            <path d="M7 14l5-5 5 5z" id="sortIndicator"/>
          ) : (
            <path d="M7 10l5 5 5-5z" id="sortIndicator"/>
          ) 
        }
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
  	);
  }
}
