import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.scss';

export default function Navbar({ children, ...restProps }) {
  return (
    <div className="navbar">
      <div className="container flex between" {...restProps}>
        {children}
      </div>
    </div>
  );
}

Navbar.Logo = function NavbarLogo({ children, ...restProps }) {
  return (
    <div className="logo" {...restProps}>
      {children}
    </div>
  );
};

Navbar.LogoImage = function NavbarLogoImage({ alt, ...restProps }) {
  return <img alt={alt} {...restProps} />;
};

Navbar.LogoText = function NavbarLogoText({ children, ...restProps }) {
  return <h1 {...restProps}>{children}</h1>;
};

Navbar.Menu = function NavbarMenu({ children, ...restProps }) {
  return (
    <nav>
      <ul {...restProps}>{children}</ul>
    </nav>
  );
};

Navbar.MenuItem = function NavbarMenuItem({ children, ...restProps }) {
  return <li {...restProps}>{children}</li>;
};

Navbar.TextLink = function NavbarTextLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Navbar.ButtonLink = function NavbarButtonLink({ children, ...restProps }) {
  return (
    <Link className="btn-secondary" {...restProps}>
      {children}
    </Link>
  );
};
