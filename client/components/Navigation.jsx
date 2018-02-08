import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Questions', href: '/questions' },
  { label: 'Ask Question', href: '/create' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
  { label: 'Profile', href: '/profile' },
  { label: 'Logout', href: '/logout' },
];

const loggedInNavs = ['Ask Question', 'Profile', 'Logout'];
const loggedOutNavs = ['Login', 'Register'];

const linkFilter = (array1, array2) => (
  array1.filter(e => array2.indexOf(e.label) === -1)
);

const Navigation = (props) => {
  const NavLinks = props.loggedIn
    ? linkFilter(LINKS, loggedOutNavs)
    : linkFilter(LINKS, loggedInNavs);

  return (
    <nav aria-label="Site links">
      <ul className="main-nav">
        {NavLinks.map(link => (
          <li key={link.label} className="main-nav__item">
            <Link to={link.href} className="main-nav__link">{link.label}</Link>
          </li>
      ))}
      </ul>
    </nav>
  );
};

export default Navigation;

Navigation.defaultProps = {
  loggedIn: '',
};

Navigation.propTypes = {
  loggedIn: PropTypes.string,
};
