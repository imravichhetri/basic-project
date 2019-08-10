import React, {
	useState
} from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Modal = props => {
	const [ closeModal, setCloseModal ] = useState( false );
	const _onClickHandler = () => {
		setCloseModal( true );
	};
	return (
    <div
      style={ { display: closeModal && "none" ,width: props.width || "300px", height: "300px" } }
      className="modal_container"
      >
      <span
        onClick={ props.onClose || _onClickHandler }
        >
        Close
      </span>
    <div
      className="model_content"
      >
      { props.children }
    </div>
    </div>
	);
};

Modal.propTypes = {

};

export default Modal;
