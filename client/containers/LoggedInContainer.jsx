/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoggedInContainer extends Component {
  componentWillMount() {
    this.verifyUser();
  }

  verifyUser() {
    console.log(this.props.profile._id);
  }

  render() {
    console.log(this.props);
    const { component: Profile } = this.props;

    return (
      <Route render={props => (
        this.props.profile._id.length > 0
        ? <Profile {...props} />
        : <Redirect to="/login" />
       )}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: state.userReducer.profile,
});

const LoggedInConnect = connect(mapStateToProps)(LoggedInContainer);

export default LoggedInConnect;

LoggedInContainer.defaultProps = {
  isLoggedIn: false,
  profile: {
    _id: '',
  },
};

LoggedInContainer.propTypes = {
  component: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }),
};
