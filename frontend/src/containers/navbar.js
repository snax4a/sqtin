import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { accountService } from '_services';
import { Link } from 'react-router-dom';
import { Navbar } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.png';
import userImage from '../user-image.png';

export function NavbarContainer({ children }) {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe();
  }, []);

  return (
    <Navbar>
      <Link to={ROUTES.HOME}>
        <Navbar.Logo>
          <Navbar.LogoImage src={logo} alt="Service Quotes" />
          <Navbar.LogoText>Service Quotes</Navbar.LogoText>
          <Navbar.LogoImage src={logo} alt="Service Quotes" />
        </Navbar.Logo>
      </Link>

      {!user && (
        <Navbar.Menu>
          <Navbar.MenuItem>
            <Navbar.TextLink to={ROUTES.HOME}>{t('Home')}</Navbar.TextLink>
          </Navbar.MenuItem>

          <Navbar.MenuItem>
            <Navbar.TextLink to={ROUTES.FEATURES}>{t('Features')}</Navbar.TextLink>
          </Navbar.MenuItem>

          <Navbar.MenuItem>
            <Navbar.ButtonLink to={ROUTES.LOGIN}>{t('Login')}</Navbar.ButtonLink>
          </Navbar.MenuItem>
        </Navbar.Menu>
      )}

      {user && <LoggedInNav user={user} />}

      {children}
    </Navbar>
  );
}

function LoggedInNav(props) {
  const { t } = useTranslation();
  const { user } = props;

  return (
    <>
      <Navbar.Menu>
        <Navbar.MenuItem>
          <Navbar.TextLink to={ROUTES.CUSTOMERS}>{t('Customers')}</Navbar.TextLink>
        </Navbar.MenuItem>

        <Navbar.MenuItem>
          <Navbar.TextLink to={ROUTES.CUSTOMER_ADDRESSES}>
            {t('Customer Addresses')}
          </Navbar.TextLink>
        </Navbar.MenuItem>

        <Navbar.MenuItem>
          <Navbar.TextLink to={ROUTES.QUOTES}>{t('Quotes')}</Navbar.TextLink>
        </Navbar.MenuItem>
      </Navbar.Menu>

      <Navbar.User>
        <Navbar.MenuItem className="user">
          <Navbar.TextLink to={ROUTES.ACCOUNT_DETAILS}>
            <Navbar.UserImage src={userImage} />
            {user.firstName} {user.lastName}
          </Navbar.TextLink>
        </Navbar.MenuItem>

        <Navbar.MenuItem>
          <Navbar.ButtonLink to="#" onClick={accountService.logout}>
            {t('Logout')}
          </Navbar.ButtonLink>
        </Navbar.MenuItem>
      </Navbar.User>
    </>
  );
}
