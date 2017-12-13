import React from 'React';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Login', href: '/login' },
];

const Navigation = () => (
  <nav aria-label="Site links">
    <ul className="main-nav">
      {LINKS.map(link => (
        <li key={link.label} className="main-nav__item">
          <a className="main-nav__link" href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
