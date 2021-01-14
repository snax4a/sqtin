import React, { useState, useEffect } from 'react';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Table } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, customerService } from '_services';
import { useTranslation } from 'react-i18next';

export default function CustomerList() {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setIsFetching(true);

    customerService
      .getAll()
      .then((res) => setCustomers(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  };

  const deleteCustomer = (id) => {
    customerService
      .delete(id)
      .then(() => {
        fetchCustomers();
        alertService.success(t('Customer deleted'));
      })
      .catch((error) => {
        alertService.error(error);
      });
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Customer List')}</h1>

        <Table>
          <Table.Head>
            <tr>
              <th>ID</th>
              <th>{t('Name')}</th>
              <th>E-mail</th>
              <th style={{ width: 290 }}>{t('Actions')}</th>
            </tr>
          </Table.Head>

          <Table.Body>
            {isFetching && <Table.Loader />}
            {!isFetching && customers.length === 0 && <Table.NoRecords />}
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <ul>
                    <li>
                      <Link to={`/customer/${customer.id}/details`} className="btn btn-blue">
                        {t('Details')}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/customer/${customer.id}/edit`} className="btn btn-grey">
                        {t('Edit')}
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => deleteCustomer(customer.id)}
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
              <th colSpan="4">
                <Link to={ROUTES.CUSTOMER_ADD} className="btn btn-sm btn-secondary">
                  {t('Add New Customer')}
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
