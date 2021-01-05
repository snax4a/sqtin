import React, { useState, useEffect } from 'react';
import { alertService, customerService, customerAddressService } from '_services';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from 'constants/routes';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Form, Loader } from 'components';

export default function CustomerAddressAddEdit({ match }) {
  const { customerId, addressId } = match.params;
  const isAddMode = !customerId || !addressId;

  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    setIsFetching(true);

    customerService
      .getAll()
      .then((res) => {
        setCustomers(res);
        if (!isAddMode && Array.isArray(res)) {
          const selected = res.find((customer) => parseInt(customerId) === customer.id);
          if (selected) setSelectedCustomerId(selected.id);
        }
      })
      .catch((error) => setError(error));

    customerAddressService
      .getAllAddresses()
      .then((res) => {
        setAddresses(res);
        if (!isAddMode && Array.isArray(res)) {
          const selected = res.find((address) => parseInt(addressId) === address.id);
          if (selected) setSelectedAddressId(selected.id);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setIsFetching(false));

    if (!isAddMode) {
      customerAddressService
        .getById(customerId, addressId)
        .then((res) => setName(res.name))
        .catch((error) => setError(error));
    }
  }, [isAddMode, customerId, addressId]);

  const isInvalid = (fieldName) => validationErrors.some((el) => el.indexOf(fieldName) > -1);

  const isFormValid = async () => {
    setValidationErrors([]);

    let formObject = { name, selectedCustomerId, selectedAddressId };
    let schemaObject = {
      name: Yup.string().required('Customer Address Name is required'),
      selectedCustomerId: Yup.string().required('Customer is required'),
      selectedAddressId: Yup.string().required('Address is required'),
    };

    if (showAddressForm) {
      const addressFormObject = { street, city, zipCode, state };
      const addressSchemaObject = {
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        zipCode: Yup.string().required('ZIP Code is required'),
        state: Yup.string().required('State is required'),
      };

      delete formObject.selectedAddressId;
      delete schemaObject.selectedAddressId;
      schemaObject = Object.assign(schemaObject, addressSchemaObject);
      formObject = Object.assign(formObject, addressFormObject);
    }

    const validationSchema = Yup.object().shape(schemaObject);

    return validationSchema
      .validate(formObject, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        setValidationErrors(err.errors);
        return false;
      });
  };

  const createCustomerAddress = (fields) => {
    customerAddressService
      .create(fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: ROUTES.CUSTOMER_ADDRESSES });
        alertService.success('The customer address was successfully created.');
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error);
      });
  };

  const updateCustomerAddress = (customerId, addressId, fields) => {
    customerAddressService
      .update(customerId, addressId, fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: `/customer/${customerId}/address/${addressId}/details` });
        alertService.success('The customer address was successfully updated.');
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

    const address = showAddressForm
      ? { street, city, state, zipCode }
      : addresses.find((address) => address.id === parseInt(selectedAddressId));

    if (isAddMode) {
      createCustomerAddress({ customerId: selectedCustomerId, name, ...address });
    } else {
      updateCustomerAddress(selectedCustomerId, addressId, { name, ...address });
    }
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <Form
          className="customer-form"
          onSubmit={handleSave}
          method="POST"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          {isFetching && <Loader centered />}
          {!isFetching && (
            <>
              <Form.Title>
                {isAddMode ? 'Add Customer Address' : 'Edit Customer Address'}
              </Form.Title>
              {error && <Form.Error>{error}</Form.Error>}
              {validationErrors.length > 0 && (
                <Form.Error>
                  {validationErrors.map((e, index) => (
                    <p key={index}>{e}</p>
                  ))}
                </Form.Error>
              )}

              <Form.Input
                placeholder="Customer Address Name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                className={isInvalid('Name') ? 'invalid' : ''}
              />

              <Form.Select
                name="customer"
                value={selectedCustomerId}
                disabled={!isAddMode}
                className={isInvalid('Customer') ? 'invalid' : ''}
                onBlur={({ target }) => setSelectedCustomerId(target.value)}
                onChange={({ target }) => setSelectedCustomerId(target.value)}
              >
                <Form.Option value="">--- Select customer ---</Form.Option>
                {customers.map((customer) => (
                  <Form.Option value={customer.id} key={customer.id}>
                    {customer.name}
                  </Form.Option>
                ))}
              </Form.Select>

              {!showAddressForm && (
                <div className="form__control address-select">
                  <select
                    name="address"
                    value={selectedAddressId}
                    className={isInvalid('Address') ? 'invalid' : ''}
                    onBlur={({ target }) => setSelectedAddressId(target.value)}
                    onChange={({ target }) => setSelectedAddressId(target.value)}
                  >
                    <Form.Option value="">--- Select address details ---</Form.Option>
                    {addresses.map((address) => (
                      <Form.Option value={address.id} key={address.id}>
                        {address.street}, {address.zipCode} {address.city}
                      </Form.Option>
                    ))}
                  </select>

                  <span className="flex">or</span>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Add New
                  </button>
                </div>
              )}

              {showAddressForm && (
                <div className="form__control grid">
                  <Form.Input
                    placeholder="Street"
                    value={street}
                    onChange={({ target }) => setStreet(target.value)}
                    className={isInvalid('Street') ? 'invalid' : ''}
                  />

                  <Form.Input
                    placeholder="City"
                    value={city}
                    onChange={({ target }) => setCity(target.value)}
                    className={isInvalid('City') ? 'invalid' : ''}
                  />

                  <Form.Input
                    placeholder="ZIP Code"
                    value={zipCode}
                    onChange={({ target }) => setZipCode(target.value)}
                    className={isInvalid('ZIP') ? 'invalid' : ''}
                  />

                  <Form.Input
                    placeholder="State"
                    value={state}
                    onChange={({ target }) => setState(target.value)}
                    className={isInvalid('State') ? 'invalid' : ''}
                  />
                </div>
              )}

              <Form.ButtonsContainer>
                <Form.Submit type="submit" className="btn btn-block">
                  {isSubmitting && <Loader />}
                  Save
                </Form.Submit>
                <Link to={ROUTES.CUSTOMER_ADDRESSES} className="btn btn-secondary btn-block">
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
