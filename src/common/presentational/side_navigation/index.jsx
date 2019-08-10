import React, { Component } from "react";
import {
	graphql as Graphql,
	compose as Compose,
	withApollo as WithApollo
} from "react-apollo";

import StolenCarForm from "../../forms/stolen_car_form";
import PoliceForm from "../../forms/police_form";
import SearchForm from "../../forms/search_form";
import Modal from "../modal";
import Notice from "../notice";
import PolicemanDetail from "../../forms/policeman_detail_form";
import CarDetail from "../../forms/car_detail_form";

import GetCarByNumber from "../../graphql/queries/get_car_by_number.graphql";
import PolicemanLogin from "../../graphql/mutations/policeman_login.graphql";
import StolenCarReport from "../../graphql/mutations/stolen_car_report.graphql";
import GetAllCases from "../../graphql/queries/get_all_case.graphql";
import CaseResolve from "../../graphql/mutations/case_resolve.graphql";

import "./styles.scss";

@WithApollo
@Compose(
	Graphql(
		PolicemanLogin,
		{
			name: "policemanLogin"
		}
	),
	Graphql(
		StolenCarReport,
		{
			name: "stolenCarReport"
		}
	),
	Graphql(
		CaseResolve,
		{
			name: "caseResolved"
		}
	)
)
export default class SideNavigation extends Component {
  state = {
  	showModal: false
  }

  _onModalClose = () => {
  	this.setState( { showModal: false, policeInfo: null, carDetail: null } );
  }

  _onCaseResolve = async ( payload ) => {
  	Notice.open( "Action In Progress" );
  	console.log( payload, "payload" );
  	// this.props.changeLoading();
  	this._resetContent();
  	try {
  		const { data } = await this.props.caseResolved( {
  			variables: payload,
  			refetchQueries: [ {
  				query: GetAllCases
  			} ]
  		} );
  		console.log( data, "policelogin" );
  		if ( data ) {
  			this.setState( { showModal: false, carDetail: null } );
  		}
  	} catch ( e ) {
  		Notice.open( e.message );
  		console.error( e, "error" );
  	}
  }
  
  _modalContainer = () => {
  	return (
      <Modal
        onClose={this._onModalClose}
        >
        { this.state.policeInfo && (
          <PolicemanDetail
            defaults={ this.state.policeInfo || {} }
            onSubmit={ this._onCaseResolve }
            />
        ) }
        { this.state.carDetail && (
          <CarDetail
            defaults={ this.state.carDetail || {} }
            />
        ) }
      </Modal>
  	);
  }
  _resetContent = () => {
  	this.setState( { showModal: false, carDetail: null, policeInfo: null } );
  }
  _onSearch = async ( payload ) => {
  	console.log( payload, "payload" );
  	Notice.open( "Action In Progress" );
  	this._resetContent();
  	try{
  		const {data} = await this.props.client.query( {
  			query: GetCarByNumber,
  			name: "getCarByNumber",
  			fetchPolicy: "network-only",
  			variables: payload
  		} );
  		console.log( data, "defaults" );
  		if ( data ) {
  			this.setState( { showModal: true, carDetail: data.GetCarByNumber } );
  		}
  	} catch( e ){
  		console.log( e, "error" );
  		Notice.open( e.message );
  	}
  }

  _onPoliceLogin = async ( payload ) => {
  	Notice.open( "Action In Progress" );
  	// this.props.changeLoading();
  	this._resetContent();
  	try {
  		const { data } = await this.props.policemanLogin( {
  			variables: payload.police 
  		} );
  		console.log( data, "policelogin" );
  		if ( data ) {
  			this.setState( { showModal: true, policeInfo: data.PolicemanLogin } );
  		}
  	} catch ( e ) {
  		Notice.open( e.message );
  		console.error( e, "error" );
  	} 
  }

  _onStolenCarReport = async ( payload ) => {
  	Notice.open( "Action In Progress" );
  	console.log( payload, "payload" );
  	// this.props.changeLoading();
  	this._resetContent();
  	try {
  		const { data } = await this.props.stolenCarReport( {
  			variables: payload.car,
  			refetchQueries: [ {
  				query: GetAllCases
  			} ]
  		} );
  		console.log( data, "policelogin" );
  		if ( data ) {
  			this.setState( { showModal: true, carDetail: data.StolenCarReport } );
  		}
  	} catch ( e ) {
  		Notice.open( e.message );
  		console.error( e, "error" );
  	} 
  };

  _content = () => {
  	console.log( this, "side_navigation" );
  	return (
      <React.Fragment>
        <div
          className="nav_form"
          key="nav_form_search"
          >
          <SearchForm
            onSubmit={this._onSearch}
            />
        </div>
        <div
          className="nav_form"
          key="nav_form_report"
          >
          <StolenCarForm
            onSubmit={this._onStolenCarReport}
            />
        </div>
        <div
          className="nav_form"
          key="nav_form_police"
          >
          <PoliceForm
            onSubmit={this._onPoliceLogin}
            />
        </div>
      </React.Fragment>
  	);
  }
  render () {
  	return (
      <div>
        { this._content() }
        {this.state.showModal && this._modalContainer()}
      </div>
  	);
  }
}
