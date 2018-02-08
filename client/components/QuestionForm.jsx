import React from 'react';
import PropTypes from 'prop-types';


const formCard = {
  backgroundColor: '#fff',
  width: '50%',
  height: '70vh',
  padding: '2rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '3rem',
  marginBottom: '5rem',
  borderRadius: '5px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: 'inherit',
  alignItems: 'center',
  paddingBottom: '2rem',
};

const inputStyle = {
  width: '75%',
  marginBottom: '1rem',
};

const textareaStyle = {
  width: '75%',
  minHeight: '65%',
  maxHeight: '65%',
  resize: 'vertical',
};

const buttonWrapper = {
  marginTop: '1rem',
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};


const QuestionForm = props => (
  <div style={formCard}>
    <div style={formStyle}>
      <h3>Ask Question</h3>
      <input
        style={inputStyle}
        type="text"
        placeholder="title"
        value={props.title}
        onChange={(e) => {
          props.handleChange(e, 'title');
        }}
      />
      <textarea
        style={textareaStyle}
        onChange={(e) => {
          props.handleChange(e, 'body');
        }}
        value={props.body}
      />
      <div style={buttonWrapper}>
        <button className="btn btn--default" onClick={() => props.handleSubmit()}>
          Submit Question
        </button>
      </div>
    </div>
  </div>
);

export default QuestionForm;

QuestionForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
