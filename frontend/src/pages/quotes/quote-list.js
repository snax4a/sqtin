import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Table } from 'components';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { alertService, quoteService } from '_services';

export default function QuoteList() {
  const { t } = useTranslation();
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
        alertService.success(t('Quote deleted'));
      })
      .catch((error) => {
        alertService.error(error);
      });
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Quote List')}</h1>

        <Table>
          <Table.Head>
            <tr>
              <th>{t('Customer Name')}</th>
              <th>{t('Description')}</th>
              <th>{t('Total')}</th>
              <th>{t('Status')}</th>
              <th style={{ width: 290 }}>{t('Actions')}</th>
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
                        {t('Details')}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/quotes/${quote.id}/edit`} className="btn btn-grey">
                        {t('Edit')}
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => deleteQuote(quote.id)}
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
              <th colSpan="5">
                <Link to={ROUTES.QUOTE_ADD} className="btn btn-sm btn-secondary">
                  {t('Add New Quote')}
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
