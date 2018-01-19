import React from 'react';
import PropTypes from 'prop-types';

const backdrop = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50,
};

const modal = {
  backgroundColor: '#fff',
  borderRadius: 5,
  maxWidth: '70%',
  minHeight: '75%',
  margin: '5rem auto',
  padding: '0rem 3rem',
  display: 'flex',
  flexDirection: 'column',
};

const buttonStyle = {
  width: '100%',
};

const buttonContainer = {
  display: 'flex',
};

const textArea = {
  width: '100%',
  height: '100%',
};

const Modal = props => (
  <div style={backdrop} >
    <div style={modal}>
      <div>
        <h2>Title</h2>
      </div>
      <div>
        <p>Question Body</p>
      </div>
      <div>
        <textarea style={textArea} rows="4" cols="50" value={props.answer} onChange={(e) => { props.handleChange(e, 'answer'); }} />
      </div>
      <div style={buttonContainer}>
        <button style={buttonStyle} onClick={() => { props.handleSubmit(); }}>Submit Answer</button>
        <button style={buttonStyle} onClick={props.toggleModal} >Cancel Answer</button>
      </div>
    </div>
  </div>
);

export default Modal;

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired,
};
