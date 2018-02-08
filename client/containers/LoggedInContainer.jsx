/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoggedInContainer extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    const { component: Profile } = this.props;

    return (
      <Route render={routeProps => (
          this.props.profile._id.length > 0
          ? <Profile {...routeProps} />
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
  profile: {
    _id: '',
  },
};

LoggedInContainer.propTypes = {
  component: PropTypes.node.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

/*
  isLoggedIn: PropTypes.bool,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }),
*/
