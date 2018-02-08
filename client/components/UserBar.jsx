import React from 'react';
import PropTypes from 'prop-types';

const UserBar = props => (
  <div className="user">
    <img className="user__avatar" width="32px" src={props.avatar} alt="" />
    <span className="user__name">{props.name}</span>
  </div>
);

UserBar.defaultProps = {
  name: '',
};

UserBar.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default UserBar;
