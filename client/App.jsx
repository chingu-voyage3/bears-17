import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'Components/Header';
import Footer from 'Components/Footer';
import About from 'Components/About';

import Home from 'Containers/Home';
import Question from 'Containers/Question';

const routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/question/:id" component={Question} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default routes;
