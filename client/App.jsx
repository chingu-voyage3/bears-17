import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import Header from 'Components/Header';
import Footer from 'Components/Footer';

import Home from 'Containers/Home';
import Question from 'Containers/Question';
import Profile from 'Containers/Profile';
import Login from 'Containers/Login';
import CreateQuestion from 'Containers/CreateQuestion';
import LoggedInContainer from 'Containers/LoggedInContainer';
import Logout from 'Containers/Logout';

const RouteContainer = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={Home} />
        <Route
          path="/login"
          render={props => <Login {...props} auth="login" />}
        />
        <Route
          path="/register"
          render={props => <Login {...props} auth="register" />}
        />
        <Route path="/question/:id" component={Question} />
        <Route path="/create" component={CreateQuestion} />
        <Route path="/logout" component={Logout} />
        <LoggedInContainer path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  </Router>
);

// const RouteConnect = connect(mapStateToProps)(RouteContainer);

export default RouteContainer;
