import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Table } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, accountService } from '_services';

export default function AccountList() {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    setIsFetching(true);

    accountService
      .getAll()
      .then((res) => setAccounts(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  };

  const deleteAccount = (id) => {
    accountService
      .delete(id)
      .then(() => {
        fetchAccounts();
        alertService.success(t('Account deleted'));
      })
      .catch((error) => {
        alertService.error(error);
      });
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Account List')}</h1>

        <Table>
          <Table.Head>
            <tr>
              <th>{t('Email')}</th>
              <th>{t('First Name')}</th>
              <th>{t('Last Name')}</th>
              <th>{t('Role')}</th>
              <th>{t('Created At')}</th>
              <th style={{ width: 290 }}>{t('Actions')}</th>
            </tr>
          </Table.Head>

          <Table.Body>
            {isFetching && <Table.Loader />}
            {!isFetching && accounts.length === 0 && <Table.NoRecords />}
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.email}</td>
                <td>{account.firstName}</td>
                <td>{account.lastName}</td>
                <td>{account.role?.name}</td>
                <td>{new Date(account.created).toLocaleString()}</td>
                <td>
                  <ul>
                    <li>
                      <Link to={`/accounts/${account.id}/details`} className="btn btn-blue">
                        {t('Details')}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/accounts/${account.id}/edit`} className="btn btn-grey">
                        {t('Edit')}
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => deleteAccount(account.id)}
                      >
                        {t('Delete')}
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </Table.Body>

          <Table.Foot>
            <tr>
              <th colSpan="100%">
                <Link to={ROUTES.ACCOUNT_ADD} className="btn btn-sm btn-secondary">
                  {t('Add New Account')}
                </Link>
              </th>
            </tr>
          </Table.Foot>
        </Table>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
