import React from 'react';
import PropTypes from 'prop-types';

const FormatDate = props => (
  <time dateTime={props.date}>
    {new Date(props.date).toLocaleString(props.locales, props.format)}
  </time>
);

FormatDate.defaultProps = {
  date: new Date().toISOString(),
  format: {
    year: undefined,
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: undefined,
  },
  locales: 'en-GB', // should be navigator.language maybe?
};

FormatDate.propTypes = {
  date: PropTypes.string,
  format: PropTypes.objectOf(PropTypes.string),
  locales: PropTypes.string,
};

export default FormatDate;
