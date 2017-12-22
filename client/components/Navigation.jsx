import React from 'react';
import { Link } from 'react-router-dom';
// import Home from '../clients/containers/Home';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Login', to: '/login' },
];

const Navigation = () => (
  <nav aria-label="Site links">
    <ul className="main-nav">
      {LINKS.map(link => (
        <li key={link.label} className="main-nav__item">
          <Link to={link.to} className="main-nav__link" href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
