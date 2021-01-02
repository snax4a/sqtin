import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { accountService, alertService } from '_services';
import * as Yup from 'yup';
import * as ROUTES from '../constants/routes';
import { Showcase, Form, Loader } from '../components';

export function ShowcaseContainer({ children }) {
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const isInvalid = (fieldName) => validationErrors.some((el) => el.indexOf(fieldName) > -1);

  const isFormValid = async () => {
    setValidationErrors([]);

    return validationSchema
      .validate({ email, password, confirmPassword }, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        setValidationErrors(err.errors);
        alertService.error(err.errors.join('<br>'));
        return false;
      });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!(await isFormValid())) return;

    setSubmitting(true);
    setError('');

    accountService
      .register({ email, password, confirmPassword })
      .then((res) => {
        const { from } = location.state || { from: { pathname: ROUTES.LOGIN } };
        history.push(from);
        alertService.success(res.message);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Showcase>
      <Showcase.Column>
        <Showcase.Title>Easier Management</Showcase.Title>
        <Showcase.Text>
          In this dashboard you can add customers, customer addresses and service providers. Service
          providers can create quotes for their work and you can inspect those quotes and send them
          to the customers.
        </Showcase.Text>
        <Showcase.ButtonLink to={ROUTES.FEATURES}>Read More</Showcase.ButtonLink>
      </Showcase.Column>

      <Showcase.Column>
        <Form onSubmit={handleRegister} method="POST">
          <Form.Title>Register account</Form.Title>

          {error && <Form.Error>{error}</Form.Error>}

          <Form.Input
            type="email"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
            className={isInvalid('Email') ? 'invalid' : ''}
          />
          <Form.Input
            type="password"
            value={password}
            autoComplete="off"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            className={isInvalid('Password') ? 'invalid' : ''}
          />
          <Form.Input
            type="password"
            value={confirmPassword}
            autoComplete="off"
            placeholder="Confirm Password"
            onChange={({ target }) => setConfirmPassword(target.value)}
            className={isInvalid('Password') ? 'invalid' : ''}
          />
          <Form.Submit type="submit">{isSubmitting && <Loader />}Register</Form.Submit>
        </Form>
      </Showcase.Column>
      {children}
    </Showcase>
  );
}
