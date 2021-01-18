import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Card, Loader } from 'components';

import { alertService, accountService } from '_services';

import userImage from 'user-image.png';

export default function AccountDetails({ match }) {
  const { t } = useTranslation();
  const [account, setAccount] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { id } = match.params;

  useEffect(() => {
    setIsFetching(true);

    accountService
      .getById(id)
      .then((res) => setAccount(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  }, [id]);

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Account Details')}</h1>

        <Card className="user-details">
          {isFetching && <Loader centered />}
          {!isFetching && account && (
            <>
              <div className="text-center mb-2">
                <img src={userImage} alt="avatar" />
              </div>
              <div>
                <div className="flex between">
                  <div>
                    {t('First Name')}: <b>{account.firstName}</b>
                  </div>

                  <Link to={`/accounts/${account.id}/edit`} className="btn btn-sm btn-grey">
                    {t('Edit')}
                  </Link>
                </div>

                <div>
                  {t('Last Name')}: <b>{account.lastName}</b>
                </div>

                <div>
                  {t('Email')}: <b>{account.email}</b>
                </div>

                <div className="mt-1">
                  {t('Role')}: <b>{account.role?.name}</b>
                </div>

                <div>
                  {t('Created At')}: <b>{new Date(account.created).toLocaleString()}</b>
                </div>
              </div>
            </>
          )}
        </Card>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
