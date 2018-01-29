import React from 'react';
import PropTypes from 'prop-types';


const buttonStyle = {
  color: '',
  border: '0.5px solid currentColor',
  textTransform: 'uppercase',
  marginRight: '0.5rem',
  fontSize: '0.80em',
  padding: '1rem',
};

const ModalButton = props => (
  <div>
    <button
      className="btn_answer"
      style={buttonStyle}
      onClick={props.toggleModal}
    >Answer Question
    </button>
  </div>
);

export default ModalButton;

ModalButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
