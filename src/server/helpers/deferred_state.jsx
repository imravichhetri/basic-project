import React from "react";

class DeferredState {
	constructor ( tree ) {
		this.tree = tree;
	}

	getScriptContent () {
		return `window.${ "__LOADABLE_STATE__" } = ${JSON.stringify( this.tree )};`;
	}

	getScriptTag () {
		return `<script>${this.getScriptContent()}</script>`;
	}

	getScriptElement () {
		return (
			<script dangerouslySetInnerHTML={ { __html: this.getScriptContent() } } />
		);
	}
}

export default DeferredState;
