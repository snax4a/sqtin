import React, { useState } from 'react';
import { accountService } from '_services';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { NavbarContainer } from '../containers/navbar';
import { PageContainer } from '../containers/page';
import { FooterContainer } from '../containers/footer';
import { Form, Loader } from '../components';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    accountService
      .login(emailAddress, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: ROUTES.DASHBOARD } };
        history.push(from);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <Form onSubmit={handleLogin} method="POST" style={{ padding: 40, width: 400 }}>
          <Form.Title>Login To Dashboard</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Input
            placeholder="Email address"
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}
          />
          <Form.Input
            type="password"
            value={password}
            autoComplete="off"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Form.Submit disabled={isInvalid} type="submit" className="btn-block">
            {isSubmitting && <Loader />}
            Login
          </Form.Submit>
        </Form>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
