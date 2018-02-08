/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';

// import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const VoteBox = props => (
  <div style={boxStyle}>
    <FaAngleUp size={22} onClick={() => props.handleVote(props.id)} />
    {props.votes}
    { /* <FaAngleDown size={22} /> */ }
  </div>
);


VoteBox.defaultProps = {
  votes: 5,
  id: '',
};

VoteBox.propTypes = {
  votes: PropTypes.number,
  handleVote: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default VoteBox;
