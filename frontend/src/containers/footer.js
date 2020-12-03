import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Footer } from '../components';
import * as ROUTES from '../constants/routes';

export function FooterContainer({ children }) {
  return (
    <Footer>
      <Footer.Column>
        <h1>Service Quotes</h1>
        <p>Copyright © 2020</p>
        <p>Szymon Sus, s16785</p>
      </Footer.Column>

      <Footer.Column>
        <Footer.Nav>
          <Footer.NavItem to={ROUTES.HOME}>Home</Footer.NavItem>
          <Footer.NavItem to={ROUTES.FEATURES}>Features</Footer.NavItem>
          <Footer.NavItem to={ROUTES.LOGIN}>Login</Footer.NavItem>
        </Footer.Nav>
      </Footer.Column>

      <Footer.Column className="footer__social">
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faTwitter} />
      </Footer.Column>

      {children}
    </Footer>
  );
}
