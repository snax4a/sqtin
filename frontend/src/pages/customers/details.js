import React, { useState, useEffect } from 'react';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Card, Table, Loader } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, customerService } from '_services';

export default function CustomerDetails({ match }) {
  const [customer, setCustomer] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { id } = match.params;

  useEffect(() => {
    if (id) {
      setIsFetching(true);

      customerService
        .getDetails(id)
        .then((res) => setCustomer(res))
        .catch((error) => {
          alertService.error(error);
        })
        .finally(() => setIsFetching(false));
    }
  }, [id]);

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>Customer Details</h1>

        <Card className={`customer-details ${!isFetching ? 'grid' : ''}`}>
          {isFetching && <Loader centered />}
          {!isFetching && customer && (
            <>
              <h2>
                Name: <b>{customer.name}</b>
              </h2>
              <h2>
                Email: <b>{customer.email}</b>
              </h2>
              <Link to={`/customer/${customer.id}/edit`} className="btn btn-sm btn-grey">
                Edit
              </Link>
            </>
          )}
        </Card>

        <h1 className="mt-4">Customer Addresses</h1>
        <Table>
          <Table.Head>
            <tr>
              <th>Name</th>
              <th>Street</th>
              <th>City</th>
              <th>ZIP Code</th>
              <th>State</th>
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
                <Link to={ROUTES.CUSTOMER_ADDRESS_ADD} className="btn btn-sm btn-secondary">
                  Add New Address
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
