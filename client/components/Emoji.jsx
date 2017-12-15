import React from 'react';
import PropTypes from 'prop-types';

const Emoji = props => (
  <span className="emoji" role="img" aria-label={props.label}>
    {props.children}
  </span>
);

Emoji.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Emoji;
