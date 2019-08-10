import React, { Component } from "react";

import SideNavigation from "../../presentational/side_navigation";
import "./styles.scss";
import Env from "../../utils/env";
import ErrorBoundComponent from "../../presentational/error_bound_component";

export default class Dashboard extends ErrorBoundComponent {
	render () {
		console.log( SideNavigation, "Dashboard" );
		return (
      <div
        id="container"
        >
        <header>
          <div
            className="logo"
            >
            <img src="https://uploads-ssl.webflow.com/5c51758c58939b30a6fd3d73/5c519a89c482b5674e5ecf3d_Primary%20Logo%402x.svg" width="150" alt="Squadcast" className="image"/>
          </div>  
        </header>
        <section>
          <aside>
            <SideNavigation />
            { /* Env.isClient() && <SideNavigation/> */ }
          </aside>
          <main>
            {/* Content */}
            { this.props.children }
          </main>
        </section>
        <footer
          className="flex_center"
          >
          Copyright 2019
        </footer>
      </div>
		);
	}
}
