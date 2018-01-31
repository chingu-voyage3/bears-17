import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'Components/Header';
import Footer from 'Components/Footer';

import Home from 'Containers/Home';
import Question from 'Containers/Question';

const routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/question/:id" component={Question} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default routes;
