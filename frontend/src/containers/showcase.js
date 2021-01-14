import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { accountService, alertService } from '_services';
import * as Yup from 'yup';
import * as ROUTES from '../constants/routes';
import { Showcase, Form, Loader } from '../components';

export function ShowcaseContainer({ children }) {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('Email is invalid')).required(t('Email is required')),
    password: Yup.string()
      .min(6, t('Password must be at least 6 characters'))
      .required(t('Password is required')),
    confirmPassword: Yup.string()
      .required(t('Confirm Password is required'))
      .oneOf([Yup.ref('password')], t('Passwords must match')),
  });

  const isInvalid = (fieldName) => validationErrors.some((el) => el.indexOf(t(fieldName)) > -1);

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
        <Showcase.Title>{t('Easier Management')}</Showcase.Title>
        <Showcase.Text>{t('In this dashboard')}</Showcase.Text>
        <Showcase.ButtonLink to={ROUTES.FEATURES}>{t('Read More')}</Showcase.ButtonLink>
      </Showcase.Column>

      <Showcase.Column>
        <Form onSubmit={handleRegister} method="POST" className="big-shadow">
          <Form.Title>{t('Register account')}</Form.Title>

          {error && <Form.Error>{error}</Form.Error>}

          <Form.Input
            type="email"
            placeholder={t('Email address')}
            onChange={({ target }) => setEmail(target.value)}
            className={isInvalid('Email') ? 'invalid' : ''}
          />
          <Form.Input
            type="password"
            value={password}
            autoComplete="off"
            placeholder={t('Password')}
            onChange={({ target }) => setPassword(target.value)}
            className={isInvalid('Password') ? 'invalid' : ''}
          />
          <Form.Input
            type="password"
            value={confirmPassword}
            autoComplete="off"
            placeholder={t('Confirm Password')}
            onChange={({ target }) => setConfirmPassword(target.value)}
            className={isInvalid('Password') ? 'invalid' : ''}
          />
          <Form.Submit type="submit">
            {isSubmitting && <Loader />}
            {t('Register')}
          </Form.Submit>
        </Form>
      </Showcase.Column>
      {children}
    </Showcase>
  );
}
