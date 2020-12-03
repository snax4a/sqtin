import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.png';

export function NavbarContainer({ children }) {
  return (
    <Navbar>
      <Link to={ROUTES.HOME}>
        <Navbar.Logo>
          <Navbar.LogoImage src={logo} alt="Service Quotes" />
          <Navbar.LogoText>Service Quotes</Navbar.LogoText>
          <Navbar.LogoImage src={logo} alt="Service Quotes" />
        </Navbar.Logo>
      </Link>
      <Navbar.Menu>
        <Navbar.MenuItem>
          <Navbar.TextLink to={ROUTES.HOME}>Home</Navbar.TextLink>
        </Navbar.MenuItem>

        <Navbar.MenuItem>
          <Navbar.TextLink to={ROUTES.FEATURES}>Features</Navbar.TextLink>
        </Navbar.MenuItem>

        <Navbar.MenuItem>
          <Navbar.ButtonLink to={ROUTES.LOGIN}>Login</Navbar.ButtonLink>
        </Navbar.MenuItem>
      </Navbar.Menu>

      {children}
    </Navbar>
  );
}
