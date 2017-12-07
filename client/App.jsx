import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from 'Components/Home';

const routes = () => (
  <Router>
    <Route path="/" component={Home} />
  </Router>
);

export default routes;
