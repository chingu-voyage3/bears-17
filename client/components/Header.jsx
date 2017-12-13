import React from 'react';

import Navigation from 'Components/Navigation';
import Logo from 'Components/Logo';

const Header = () => (
  <header className="site-header">
    <div className="wrapper wrapper--flex">
      <Logo />
      <Navigation />
    </div>
  </header>
);

export default Header;
