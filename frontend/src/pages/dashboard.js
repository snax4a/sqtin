import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faIdCard,
  faMapMarkerAlt,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from 'components';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { accountService } from '_services';

import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/role';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Dashboard')}</h1>

        {accountService.userHasRole(ROLES.User) ? (
          <div className="text-center">
            <p>{t('No permission')}</p>
          </div>
        ) : (
          <div className="dashboard-links grid grid-4">
            {accountService.userHasRole(ROLES.Manager) && (
              <Link to={ROUTES.ACCOUNTS}>
                <Card>
                  <FontAwesomeIcon icon={faIdCard} />
                  <h3>{t('User Accounts')}</h3>
                </Card>
              </Link>
            )}

            <Link to={ROUTES.CUSTOMERS}>
              <Card>
                <FontAwesomeIcon icon={faUsers} />
                <h3>{t('Customers')}</h3>
              </Card>
            </Link>

            <Link to={ROUTES.CUSTOMER_ADDRESSES}>
              <Card>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <h3>{t('Customer Addresses')}</h3>
              </Card>
            </Link>

            <Link to={ROUTES.QUOTES}>
              <Card>
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                <h3>{t('Quotes')}</h3>
              </Card>
            </Link>
          </div>
        )}
      </PageContainer>
      <FooterContainer />
    </>
  );
}
