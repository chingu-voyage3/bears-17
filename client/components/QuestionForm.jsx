import React from 'react';
import PropTypes from 'prop-types';

const QuestionForm = props => (
  <div>
    <input type="text" placeholder="title" value={props.title} onChange={(e) => { props.handleChange(e, 'title'); }} />
    <input type="text" placeholder="body" value={props.body} onChange={(e) => { props.handleChange(e, 'body'); }} />
  </div>
);

export default QuestionForm;

QuestionForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
