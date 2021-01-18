import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Card, Table, Loader } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import * as ROLE from 'constants/role';
import { alertService, customerService, accountService } from '_services';

export default function CustomerDetails({ match }) {
  const { t } = useTranslation();
  const [customer, setCustomer] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { id } = match.params;
  const isManager = accountService.userHasRole(ROLE.Manager);

  useEffect(() => {
    setIsFetching(true);

    customerService
      .getDetails(id)
      .then((res) => setCustomer(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  }, [id]);

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Customer Details')}</h1>

        <Card className={`customer-details ${!isFetching ? 'grid' : ''}`}>
          {isFetching && <Loader centered />}
          {!isFetching && customer && (
            <>
              <h2>
                {t('Name')}: <b>{customer.name}</b>
              </h2>
              <h2>
                Email: <b>{customer.email}</b>
              </h2>
              {isManager && (
                <Link to={`/customer/${customer.id}/edit`} className="btn btn-sm btn-grey edit-btn">
                  {t('Edit')}
                </Link>
              )}
            </>
          )}
        </Card>

        <h1 className="mt-4">{t('1 Customer Addresses')}</h1>
        <Table>
          <Table.Head>
            <tr>
              <th>{t('Name')}</th>
              <th>{t('Street')}</th>
              <th>{t('City')}</th>
              <th>{t('ZIP Code')}</th>
              <th>{t('State')}</th>
            </tr>
          </Table.Head>

          <Table.Body>
            {isFetching && <Table.Loader />}
            {!isFetching && customer && customer.customerAddresses.length === 0 && (
              <Table.NoRecords />
            )}
            {!isFetching &&
              customer &&
              customer.customerAddresses.map((ca, index) => (
                <tr key={index}>
                  <td>{ca.name}</td>
                  <td>{ca.address.street}</td>
                  <td>{ca.address.city}</td>
                  <td>{ca.address.zipCode}</td>
                  <td>{ca.address.state}</td>
                </tr>
              ))}
          </Table.Body>

          <Table.Foot>
            <tr>
              <th colSpan="5">
                {isManager && (
                  <Link to={ROUTES.CUSTOMER_ADDRESS_ADD} className="btn btn-sm btn-secondary">
                    {t('Add New Address')}
                  </Link>
                )}
              </th>
            </tr>
          </Table.Foot>
        </Table>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
