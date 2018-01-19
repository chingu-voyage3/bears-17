import React from 'react';
import PropTypes from 'prop-types';

const ModalButton = props => (
  <div>
    <button onClick={props.toggleModal}>Answer Question</button>
  </div>
);

export default ModalButton;

ModalButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
