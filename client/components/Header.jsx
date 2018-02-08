/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navigation from 'Components/Navigation';
import Logo from 'Components/Logo';

const Header = props => (
  <header className="site-header">
    <div className="wrapper wrapper--flex">
      <Logo />
      <Navigation loggedIn={props.loggedIn} />
    </div>
  </header>
);


const mapStateToProps = state => ({
  loggedIn: state.userReducer.profile._id,
});

const HeaderConnect = connect(mapStateToProps)(Header);

export default HeaderConnect;

Header.defaultProps = {
  loggedIn: '',
};

Header.propTypes = {
  loggedIn: PropTypes.string,
};
