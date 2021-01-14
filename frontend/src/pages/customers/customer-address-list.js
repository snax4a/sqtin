import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Table } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, customerAddressService } from '_services';

export default function CustomerAddressList() {
  const { t } = useTranslation();
  const [isFetching, setIsFetching] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState([]);

  useEffect(() => {
    fetchCustomerAddresses();
  }, []);

  const fetchCustomerAddresses = () => {
    setIsFetching(true);

    customerAddressService
      .getAll()
      .then((res) => setCustomerAddresses(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  };

  const deleteCustomerAddress = (customerId, addressId) => {
    customerAddressService
      .delete(customerId, addressId)
      .then(() => {
        fetchCustomerAddresses();
        alertService.success(t('Customer address deleted'));
      })
      .catch((error) => {
        alertService.error(error);
      });
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Customer Address List')}</h1>

        <Table>
          <Table.Head>
            <tr>
              <th>{t('Customer Name')}</th>
              <th>{t('Address Name')}</th>
              <th>{t('City')}</th>
              <th style={{ width: 290 }}>{t('Actions')}</th>
            </tr>
          </Table.Head>

          <Table.Body>
            {isFetching && <Table.Loader />}
            {!isFetching && customerAddresses.length === 0 && <Table.NoRecords />}
            {customerAddresses.map((ca, index) => (
              <tr key={index}>
                <td>{ca.customer.name}</td>
                <td>{ca.name}</td>
                <td>{ca.address.city}</td>
                <td>
                  <ul>
                    <li>
                      <Link
                        to={`/customer/${ca.customerId}/address/${ca.addressId}/details`}
                        className="btn btn-blue"
                      >
                        {t('Details')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/customer/${ca.customerId}/address/${ca.addressId}/edit`}
                        className="btn btn-grey edit-btn"
                      >
                        {t('Edit')}
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => deleteCustomerAddress(ca.customerId, ca.addressId)}
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
                <Link to={ROUTES.CUSTOMER_ADDRESS_ADD} className="btn btn-sm btn-secondary">
                  {t('Add New Address')}
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
