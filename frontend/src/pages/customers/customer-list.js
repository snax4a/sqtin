import React, { useState, useEffect } from 'react';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Table } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, customerService } from '_services';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    customerService
      .getAll()
      .then((res) => setCustomers(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>Customer List</h1>

        <Table>
          <Table.Head>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th style={{ width: 290 }}>Actions</th>
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
                        Details
                      </Link>
                    </li>
                    <li>
                      <Link to={`/customer/${customer.id}/edit`} className="btn btn-grey">
                        Edit
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn btn-secondary">
                        Delete
                      </Link>
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
                  Add New Customer
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
