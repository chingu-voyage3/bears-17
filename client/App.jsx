import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from 'Components/Header';
import Footer from 'Components/Footer';

import Home from 'Containers/Home';
import Question from 'Containers/Question';
import QuestionList from 'Containers/QuestionList';

const routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path exact="/" component={Home} />
        <Route path="/questions" component={QuestionList} />
        <Route path="/question/:id" component={Question} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default routes;
