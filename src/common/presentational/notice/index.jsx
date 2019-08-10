import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

/* const Notice = props => {
	return (
    <div>
      
    </div>
	);
};

Notice.propTypes = {

}; */
const Notice = {
	noticeRef: React.createRef(),
	open: ( content ) => {
		const NoticeContainer = ( content ) => {
			return (
        <div
          ref={noticeRef }
          className="notice_container"
          >
          { content }
        </div>
			);
		};
		const noticeContainer = document.createElement( "div" );
		noticeContainer.setAttribute( "class", "notice_container" );
		noticeContainer.setAttribute( "id", "noticeContainer" );
		noticeContainer.innerHTML = `<div class="notice_content">${content}<div>`;
		document.body.appendChild( noticeContainer );
		// ReactDOM.render( <div><NoticeContainer /></div>, noticeContainer );
		console.log( Notice, "noticeContainer outside" );
		setTimeout( () => {
			console.log( Notice, this, noticeContainer, "noticeContainer" );
			ReactDOM.unmountComponentAtNode( noticeContainer );
			noticeContainer.parentNode.removeChild( noticeContainer );
		}, 2000 );
		/* const noticeContainer = document.createElement( "div" );
		noticeContainer.setAttribute( "class", "notice_container" );
		noticeContainer.setAttribute( "id", "noticeContainer" );
		noticeContainer.innerHTML = content;
		console.log( {noticeContainer}, "staticMarku" );
		document.body.appendChild( noticeContainer );
		setTimeout( () => {
			const node = ReactDOM.findDOMNode( document.getElementById( "noticeContainer" ) );
			console.log( noticeContainer, node, "noticeContainer" );
			ReactDOM.unmountComponentAtNode( node );
		},2000 ); */
	}
};

export default Notice;
