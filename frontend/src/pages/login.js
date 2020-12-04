import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavbarContainer } from '../containers/navbar';
import { PageContainer } from '../containers/page';
import { FooterContainer } from '../containers/footer';
import { Form } from '../components';

export default function Login() {
  const history = useHistory();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(event);
    // TODO implement login handler
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
            Login
          </Form.Submit>
        </Form>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
