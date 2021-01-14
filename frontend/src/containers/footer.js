import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Footer } from '../components';
import * as ROUTES from '../constants/routes';

export function FooterContainer({ children }) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (code) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
  };

  return (
    <Footer>
      <Footer.Column>
        <h1>Service Quotes</h1>
        <p>Copyright © 2020</p>
        <p>Szymon Sus, s16785</p>
      </Footer.Column>

      <Footer.Column>
        <Footer.Nav>
          <Footer.NavItem to={ROUTES.HOME}>{t('Home')}</Footer.NavItem>
          <Footer.NavItem to={ROUTES.FEATURES}>{t('Features')}</Footer.NavItem>
          <Footer.NavItem to={ROUTES.LOGIN}>{t('Login')}</Footer.NavItem>
        </Footer.Nav>
      </Footer.Column>

      <Footer.Column className="footer__social">
        <ReactFlagsSelect
          selectedSize={20}
          optionsSize={20}
          defaultCountry="GB"
          countries={['GB', 'PL']}
          showOptionLabel={false}
          showSelectedLabel={false}
          selected={selectedLanguage}
          onSelect={changeLanguage}
          className="language-select"
        />
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faTwitter} />
      </Footer.Column>

      {children}
    </Footer>
  );
}
