import React, { Component } from "react";

import "./styles.scss";
export default class Dashboard extends Component {
	render () {
		return (
      <div
        id="container"
        >
        <header>
          Header
        </header>
        <section>
          <aside>
            {/* Side Nav */}
          </aside>
          <main>
            {/* Content */}
            { this.props.children }
          </main>
        </section>
        <footer>
          Footer
        </footer>
      </div>
		);
	}
}
