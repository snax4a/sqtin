import React, { useState, useEffect } from 'react';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Table } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, quoteService } from '_services';

export default function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = () => {
    setIsFetching(true);

    quoteService
      .getAll()
      .then((res) => setQuotes(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  };

  const deleteQuote = (id) => {
    quoteService
      .delete(id)
      .then(() => {
        fetchQuotes();
        alertService.success('Quote was successfully deleted.');
      })
      .catch((error) => {
        alertService.error(error);
      });
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>Quote List</h1>

        <Table>
          <Table.Head>
            <tr>
              <th>Customer Name</th>
              <th>Description</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ width: 290 }}>Actions</th>
            </tr>
          </Table.Head>

          <Table.Body>
            {isFetching && <Table.Loader />}
            {!isFetching && quotes.length === 0 && <Table.NoRecords />}
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td>{quote.customer?.name}</td>
                <td>{quote.description}</td>
                <td>${quote.total}</td>
                <td>{quote.status}</td>
                <td>
                  <ul>
                    <li>
                      <Link to={`/quotes/${quote.id}/details`} className="btn btn-blue">
                        Details
                      </Link>
                    </li>
                    <li>
                      <Link to={`/quotes/${quote.id}/edit`} className="btn btn-grey">
                        Edit
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => deleteQuote(quote.id)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </Table.Body>

          <Table.Foot>
            <tr>
              <th colSpan="5">
                <Link to={ROUTES.QUOTE_ADD} className="btn btn-sm btn-secondary">
                  Add New Quote
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
