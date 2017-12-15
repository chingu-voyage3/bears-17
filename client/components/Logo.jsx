import React from 'react';

import logo from '../images/logo.svg';

const Logo = () => (
  <div className="logo">
    <a href="/" className="logo__link">
      <img src={logo} alt="Our app's name" />
    </a>
  </div>
);

export default Logo;
