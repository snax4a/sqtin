import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Card, Loader } from 'components';

import * as STATUSES from 'constants/statuses';
import { alertService, quoteService } from '_services';

export default function QuoteDetails({ match }) {
  const [quote, setQuote] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { id } = match.params;

  useEffect(() => {
    setIsFetching(true);

    quoteService
      .getDetails(id)
      .then((res) => setQuote(res))
      .catch((error) => {
        alertService.error(error);
      })
      .finally(() => setIsFetching(false));
  }, [id]);

  const getColorByStatus = (status) => {
    switch (status) {
      case STATUSES.APPROVED:
        return 'green';
      case STATUSES.REJECTED:
        return 'red';
      case STATUSES.SENT_TO_CUSTOMER:
        return 'orange';
      default:
        return 'black';
    }
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>Quote Details</h1>

        <Card>
          {isFetching && <Loader centered />}
          {!isFetching && quote && (
            <>
              <div className="flex between">
                <div>
                  Created At: <b>{new Date(quote.created).toLocaleString()}</b>
                </div>

                <Link to={`/quotes/${quote.id}/edit`} className="btn btn-sm btn-grey">
                  Edit
                </Link>
              </div>

              <div>
                Created By:{' '}
                <b>
                  {quote.account.firstName} {quote.account.lastName}, {quote.account.email}
                </b>{' '}
                ({quote.account.role.name})
              </div>

              <div>
                Is Service Provider quote: <b>{quote.serviceProviderQuoteId ? 'Yes' : 'No'}</b>
              </div>

              <div className="mt-1">
                Customer Name: <b>{quote.customer.name}</b>
              </div>

              <div>
                Customer Email: <b>{quote.customer.email}</b>
              </div>

              <div>
                Customer Address:{' '}
                <b>
                  {quote.address.street}, {quote.address.zipCode} {quote.address.city}
                  {', '}
                  {quote.address.state}
                </b>
              </div>

              <div className="mt-1">
                Total: <b>${quote.total}</b>
              </div>

              <div>
                Status: <b style={{ color: getColorByStatus(quote.status) }}>{quote.status}</b>
              </div>

              <div>
                Description: <b>{quote.description}</b>
              </div>
            </>
          )}
        </Card>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
