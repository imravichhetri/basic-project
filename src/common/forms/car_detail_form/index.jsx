import React from "react";
import PropTypes from "prop-types";

const CarDetail = props => {
	return (
    <div
      className="row"
      >
      <div
        className="form_elem"
        >
        <b>Number: </b> {props.defaults.number}
      </div>
      <div
        className="form_elem"
        >
        <b>Model: </b> {props.defaults.model }
      </div>
      <div
        className="form_elem"
        >
        <b>Brand: </b> {props.defaults.brand}
      </div>
      <div
        className="form_elem"
        >
        <b>Color: </b> {props.defaults.color}
      </div>
      <div
        className="form_elem"
        >
        <b>Staus: </b> { props.defaults.status }
      </div>
    </div>
	);
};

CarDetail.propTypes = {

};

export default CarDetail;
