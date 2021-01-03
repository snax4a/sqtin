import React, { useState, useEffect } from 'react';
import { alertService, customerService } from '_services';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from 'constants/routes';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Form, Loader } from 'components';

export default function CustomerAddEdit({ match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  if (id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setIsFetching(true);

      customerService
        .getById(id)
        .then((res) => {
          setName(res.name);
          setEmail(res.email);
        })
        .catch((error) => setError(error))
        .finally(() => setIsFetching(false));
    }, [id]);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const isInvalid = (fieldName) => validationErrors.some((el) => el.indexOf(fieldName) > -1);

  const isFormValid = async () => {
    setValidationErrors([]);

    return validationSchema
      .validate({ name, email }, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        setValidationErrors(err.errors);
        return false;
      });
  };

  const createCustomer = (fields) => {
    customerService
      .create(fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: ROUTES.CUSTOMERS });
        alertService.success('The customer was successfully created.');
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error);
      });
  };

  const updateCustomer = (id, fields) => {
    customerService
      .update(id, fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: `/customer/${id}/details` });
        alertService.success('The customer was successfully updated.');
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
      createCustomer({ name, email });
    } else {
      updateCustomer(id, { name, email });
    }
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <Form
          onSubmit={handleSave}
          method="POST"
          style={{ padding: 40, width: 400, marginLeft: 'auto', marginRight: 'auto' }}
        >
          {isFetching && <Loader centered />}
          {!isFetching && (
            <>
              <Form.Title>{isAddMode ? 'Add Customer' : 'Edit Customer'}</Form.Title>
              {error && <Form.Error>{error}</Form.Error>}
              {validationErrors.length > 0 && (
                <Form.Error>
                  {validationErrors.map((e) => (
                    <p>{e}</p>
                  ))}
                </Form.Error>
              )}

              <Form.Input
                placeholder="Name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                className={isInvalid('Name') ? 'invalid' : ''}
              />

              <Form.Input
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                className={isInvalid('Email') ? 'invalid' : ''}
              />

              <Form.ButtonsContainer>
                <Form.Submit type="submit" className="btn btn-block">
                  {isSubmitting && <Loader />}
                  Save
                </Form.Submit>
                <Link to={ROUTES.CUSTOMERS} className="btn btn-secondary btn-block">
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
