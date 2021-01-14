import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Card, Loader } from 'components';
import { Link } from 'react-router-dom';
import { alertService, customerAddressService } from '_services';

export default function CustomerAddressDetails({ match }) {
  const { t } = useTranslation();
  const [customerAddress, setCustomerAddress] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { customerId, addressId } = match.params;

  useEffect(() => {
    setIsFetching(true);

    customerAddressService
      .getDetails(customerId, addressId)
      .then((res) => setCustomerAddress(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  }, [customerId, addressId]);

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Customer Address Details')}</h1>

        <Card className={!isFetching ? 'grid grid-2-sm' : ''}>
          {isFetching && <Loader centered />}
          {!isFetching && customerAddress && (
            <>
              <h2>
                {t('Address Name')}: <b>{customerAddress.name}</b>
              </h2>
              <Link
                to={`/customer/${customerAddress.customerId}/address/${customerAddress.addressId}/edit`}
                className="btn btn-sm btn-grey edit-btn"
              >
                {t('Edit')}
              </Link>
            </>
          )}
        </Card>

        <h1 className="mt-3">{t('Customer')}</h1>

        <Card className={!isFetching ? 'grid' : ''}>
          {isFetching && <Loader centered />}
          {!isFetching && customerAddress && (
            <>
              <h2>
                {t('Name')}: <b>{customerAddress.customer.name}</b>
              </h2>
              <h2>
                Email: <b>{customerAddress.customer.email}</b>
              </h2>
            </>
          )}
        </Card>

        <h1 className="mt-3">{t('Address')}</h1>

        <Card className={!isFetching ? 'grid' : ''}>
          {isFetching && <Loader centered />}
          {!isFetching && customerAddress && (
            <>
              <h2>
                {t('Street')}: <b>{customerAddress.address.street}</b>
              </h2>
              <h2>
                {t('City')}: <b>{customerAddress.address.city}</b>
              </h2>
              <h2>
                {t('ZIP Code')}: <b>{customerAddress.address.zipCode}</b>
              </h2>
              <h2>
                {t('State')}: <b>{customerAddress.address.state}</b>
              </h2>
            </>
          )}
        </Card>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
