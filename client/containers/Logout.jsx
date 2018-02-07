/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearUser } from '../actions/user.js';


class Logout extends Component {
  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount() {
    this.logoutUser();
  }

  logoutUser() {
    this.props.clearUser();
  }

  render() {
    if (this.props.profile._id.length > 1) {
      return (
        <div>
          LoggingOut
        </div>
      );
    }
    return (
      <Redirect to="/" />
    );
  }
}


const mapDispatchToProps = dispatch => ({
  clearUser: () => dispatch(clearUser()),
});

const mapStateToProps = state => ({
  profile: state.userReducer.profile,
});

const LogoutConnect = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default LogoutConnect;

Logout.defaultProps = {
  profile: {
    _id: '',
  },
};

Logout.propTypes = {
  clearUser: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }),
};
