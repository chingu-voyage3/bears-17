import React from 'react';
import PropTypes from 'prop-types';

import { MdCancel } from 'react-icons/lib/md';

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
  borderRadius: 0,
  maxWidth: '70%',
  minHeight: '75%',
  margin: '5rem auto',
  padding: '1rem 3rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
};

const buttonStyle = {
  width: '100%',
  height: '100%',
};

const buttonContainer = {
  display: 'flex',
  paddingBottom: '2rem',
};

const textArea = {
  width: '100%',
};

const areaContainer = {
  marginBottom: '0.5rem',
};

const alignLeft = {
  marginLeft: 'auto',
};

const Modal = props => (
  <div style={backdrop} >
    <div className="modal" style={modal}>
      <div style={alignLeft}>
        <MdCancel onClick={props.toggleModal} />
      </div>
      <div>
        <h2>{props.questionTitle}</h2>
      </div>
      <div>
        <p>{props.questionBody}</p>
      </div>
      <div style={areaContainer} >
        <textarea className="answer-box" style={textArea} rows="4" cols="50" value={props.answer} onChange={(e) => { props.handleChange(e, 'answer'); }} />
      </div>
      <div style={buttonContainer}>
        <button
          className="btn btn--success"
          style={buttonStyle}
          onClick={() => { props.handleSubmit(); }}
        >Submit Answer
        </button>
        <button
          className="btn btn--danger decline_btn"
          style={buttonStyle}
          onClick={props.toggleModal}
        >Cancel Answer
        </button>
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
  questionTitle: PropTypes.string.isRequired,
  questionBody: PropTypes.string.isRequired,
};
