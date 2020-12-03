import React from 'react';
import { Link } from 'react-router-dom';
import './styles/footer.scss';

export default function Footer({ children, ...restProps }) {
  return (
    <footer className="footer bg-dark py-5">
      <div className="container grid grid-3" {...restProps}>
        {children}
      </div>
    </footer>
  );
}

Footer.Column = function FooterColumn({ children, ...restProps }) {
  return (
    <div className="footer__column" {...restProps}>
      {children}
    </div>
  );
};

Footer.Nav = function FooterNav({ children, ...restProps }) {
  return (
    <nav className="footer__nav" {...restProps}>
      <ul>{children}</ul>
    </nav>
  );
};

Footer.NavItem = function FooterNavItem({ children, ...restProps }) {
  return (
    <li className="footer__navitem">
      <Link {...restProps}>{children}</Link>
    </li>
  );
};
