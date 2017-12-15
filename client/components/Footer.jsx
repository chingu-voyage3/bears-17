/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import Emoji from 'Components/Emoji';

const Footer = () => (
  <footer className="site-footer">
    <div className="wrapper">
      <p>Made with <Emoji label="Love">❤️</Emoji> by the Chingu Bears 17 team</p>
      <p>Source code is available on our <a href="https://github.com/chingu-voyage3/bears-17" target="_blank" rel="noopener noreferrer">GitHub page</a>
      </p>
    </div>
  </footer>
);

export default Footer;
