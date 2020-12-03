import React from 'react';
import { Showcase, Form } from '../components';
import * as ROUTES from '../constants/routes';

export function ShowcaseContainer({ children }) {
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
        <Form>
          <Form.Title>Register account</Form.Title>
          <Form.Input type="email" placeholder="Email" required />
          <Form.Input type="password" placeholder="Password" required />
          <Form.Input type="password" placeholder="Repeat Password" required />
          <Form.Submit>Register</Form.Submit>
        </Form>
      </Showcase.Column>
      {children}
    </Showcase>
  );
}
