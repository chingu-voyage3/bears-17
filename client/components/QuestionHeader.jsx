import React from 'react';
import PropTypes from 'prop-types';

const QuestionHeader = props => (
  <div className="page__header">
    <h2 className="page__title">{props.title}</h2>
  </div>
);

QuestionHeader.defaultProps = {
  title: '',
};

QuestionHeader.propTypes = {
  title: PropTypes.string,
};

export default QuestionHeader;
