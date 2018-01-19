import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'Components/Header';
import Footer from 'Components/Footer';

import Home from 'Containers/Home';
import Question from 'Containers/Question';
import Profile from 'Containers/Profile';
import Login from 'Containers/Login';
import Register from 'Containers/Register';
import CreateQuestion from 'Containers/CreateQuestion';

const routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/question/:id" component={Question} />
        <Route path="/create" component={CreateQuestion} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default routes;
