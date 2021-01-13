import React, { useState, useEffect } from 'react';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Card, Table, Loader } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, customerAddressService } from '_services';

export default function CustomerAddressDetails({ match }) {
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
        <h1>Customer Address Details</h1>

        <Card className={!isFetching ? 'grid grid-2-sm' : ''}>
          {isFetching && <Loader centered />}
          {!isFetching && customerAddress && (
            <>
              <h2>
                Customer Address Name: <b>{customerAddress.name}</b>
              </h2>
              <Link
                to={`/customer/${customerAddress.customerId}/address/${customerAddress.addressId}/edit`}
                className="btn btn-sm btn-grey"
              >
                Edit
              </Link>
            </>
          )}
        </Card>

        <h1 className="mt-3">Customer</h1>

        <Card className={!isFetching ? 'grid' : ''}>
          {isFetching && <Loader centered />}
          {!isFetching && customerAddress && (
            <>
              <h2>
                Name: <b>{customerAddress.customer.name}</b>
              </h2>
              <h2>
                Email: <b>{customerAddress.customer.email}</b>
              </h2>
            </>
          )}
        </Card>

        <h1 className="mt-3">Address</h1>

        <Card className={!isFetching ? 'grid' : ''}>
          {isFetching && <Loader centered />}
          {!isFetching && customerAddress && (
            <>
              <h2>
                Street: <b>{customerAddress.address.street}</b>
              </h2>
              <h2>
                City: <b>{customerAddress.address.city}</b>
              </h2>
              <h2>
                ZIP Code: <b>{customerAddress.address.zipCode}</b>
              </h2>
              <h2>
                State: <b>{customerAddress.address.state}</b>
              </h2>
            </>
          )}
        </Card>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
