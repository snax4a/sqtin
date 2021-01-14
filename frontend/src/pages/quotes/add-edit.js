import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from 'constants/routes';
import * as STATUSES from 'constants/statuses';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Form, Loader } from 'components';
import {
  alertService,
  quoteService,
  customerAddressService,
  customerService,
  accountService,
} from '_services';

export default function QuoteAddEdit({ match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const history = useHistory();
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true);

        // fetch customers
        const customersResponse = await customerService.getAll();
        setCustomers(customersResponse);

        // fetch customer addresses
        const addressesResponse = await customerAddressService.getAll();
        setAddresses(addressesResponse);

        if (id) {
          const quote = await quoteService.getById(id);

          setTotal(quote.total);
          setSelectedStatus(quote.status);
          setDescription(quote.description);
          setSelectedAddressId(quote.addressId);
          setSelectedCustomerId(quote.customerId);
          setCustomerAddresses(
            addressesResponse.filter((address) => address.customerId === quote.customerId)
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe();
  }, [id]);

  const getCustomerAddresses = (customerId) => {
    const filteredAddresses = addresses.filter(
      (address) => address.customerId === parseInt(customerId)
    );
    setCustomerAddresses(filteredAddresses);
  };

  const isInvalid = (fieldName) =>
    validationErrors.some((el) => el.toLowerCase().indexOf(fieldName.toLowerCase()) > -1);

  const isFormValid = async () => {
    setValidationErrors([]);

    const validationObject = {
      selectedCustomerId: Yup.string().required('Customer is required'),
      selectedAddressId: Yup.string().required('Address is required'),
      description: Yup.string().required('Description is required'),
      selectedStatus: Yup.string().required('Status is required'),
      total: Yup.number()
        .typeError('Total is required and must be a number')
        .positive('Total must be a positive number')
        .required('Total is required'),
    };

    if (isAddMode) delete validationObject.selectedStatus;

    const validationSchema = Yup.object().shape(validationObject);

    return validationSchema
      .validate(
        { selectedCustomerId, selectedAddressId, selectedStatus, description, total },
        { abortEarly: false }
      )
      .then(() => true)
      .catch((err) => {
        setValidationErrors(err.errors);
        return false;
      });
  };

  const createQuote = (fields) => {
    quoteService
      .create(fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: ROUTES.QUOTES });
        alertService.success('Quote was successfully created.');
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error);
      });
  };

  const updateQuote = (id, fields) => {
    quoteService
      .update(id, fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: `/quotes/${id}/details` });
        alertService.success('Quote was successfully updated.');
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error);
      });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!(await isFormValid())) return;

    setSubmitting(true);
    setError('');

    if (isAddMode) {
      createQuote({
        total,
        description,
        accountId: user.id,
        customerId: selectedCustomerId,
        addressId: selectedAddressId,
      });
    } else {
      updateQuote(id, {
        total,
        description,
        accountId: user.id,
        customerId: selectedCustomerId,
        addressId: selectedAddressId,
        status: selectedStatus,
      });
    }
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <Form
          onSubmit={handleSave}
          method="POST"
          style={{ padding: 40, width: 500, marginLeft: 'auto', marginRight: 'auto' }}
        >
          {isFetching && <Loader centered />}
          {!isFetching && (
            <>
              <Form.Title>{isAddMode ? 'Add Quote' : 'Edit Quote'}</Form.Title>
              {error && <Form.Error>{error}</Form.Error>}
              {validationErrors.length > 0 && (
                <Form.Error>
                  {validationErrors.map((e) => (
                    <p>{e}</p>
                  ))}
                </Form.Error>
              )}

              <Form.Select
                value={selectedCustomerId}
                className={isInvalid('Customer') ? 'invalid' : ''}
                onBlur={({ target }) => {
                  setSelectedCustomerId(target.value);
                  getCustomerAddresses(target.value);
                }}
                onChange={({ target }) => {
                  setSelectedCustomerId(target.value);
                  getCustomerAddresses(target.value);
                }}
              >
                <Form.Option value="">--- Select customer ---</Form.Option>
                {customers.map((customer) => (
                  <Form.Option value={customer.id} key={customer.id}>
                    {customer.name}
                  </Form.Option>
                ))}
              </Form.Select>

              <Form.Select
                value={selectedAddressId}
                disabled={!selectedCustomerId}
                className={isInvalid('Address') ? 'invalid' : ''}
                onBlur={({ target }) => setSelectedAddressId(target.value)}
                onChange={({ target }) => setSelectedAddressId(target.value)}
              >
                <Form.Option value="">--- Select customer address ---</Form.Option>
                {customerAddresses.map((address) => (
                  <Form.Option
                    value={address.addressId}
                    key={`${address.customerId}_${address.addressId}`}
                  >
                    {address.name}
                  </Form.Option>
                ))}
              </Form.Select>

              {!isAddMode && (
                <Form.Select
                  value={selectedStatus}
                  className={isInvalid('Status') ? 'invalid' : ''}
                  onBlur={({ target }) => setSelectedStatus(target.value)}
                  onChange={({ target }) => setSelectedStatus(target.value)}
                >
                  <Form.Option value="">--- Select status ---</Form.Option>
                  {Object.values(STATUSES).map((status, index) => (
                    <Form.Option value={status} key={index}>
                      {status}
                    </Form.Option>
                  ))}
                </Form.Select>
              )}

              <Form.Input
                placeholder="Description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                className={isInvalid('Description') ? 'invalid' : ''}
              />

              <Form.Input
                type="number"
                placeholder="Total"
                step="0.01"
                value={total}
                onChange={({ target }) => setTotal(target.value)}
                className={isInvalid('Total') ? 'invalid' : ''}
              />

              <Form.ButtonsContainer>
                <Form.Submit type="submit" className="btn btn-block">
                  {isSubmitting && <Loader />}
                  Save
                </Form.Submit>
                <Link to={ROUTES.QUOTES} className="btn btn-secondary btn-block">
                  Cancel
                </Link>
              </Form.ButtonsContainer>
            </>
          )}
        </Form>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
