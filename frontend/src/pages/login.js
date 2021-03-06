import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { accountService } from '_services';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from 'constants/routes';
import { NavbarContainer } from '../containers/navbar';
import { PageContainer } from '../containers/page';
import { FooterContainer } from '../containers/footer';
import { Form, Loader } from '../components';

export default function Login() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().email(t('Email is invalid')).required(t('Email is required')),
    password: Yup.string()
      .min(6, t('Password must be at least 6 characters'))
      .required(t('Password is required')),
  });

  const isInvalid = (fieldName) => validationErrors.some((el) => el.indexOf(t(fieldName)) > -1);

  const isFormValid = async () => {
    setValidationErrors([]);

    return validationSchema
      .validate({ emailAddress, password }, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        setValidationErrors(err.errors);
        return false;
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!(await isFormValid())) return;

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
        <Form
          onSubmit={handleLogin}
          method="POST"
          style={{ padding: 40, width: 400, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Form.Title>{t('Login To Dashboard')}</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          {validationErrors.length > 0 && (
            <Form.Error>
              {validationErrors.map((e) => (
                <p>{e}</p>
              ))}
            </Form.Error>
          )}

          <Form.Input
            placeholder={t('Email address')}
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}
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
          <Form.Submit type="submit" className="btn-block">
            {isSubmitting && <Loader />}
            {t('Login')}
          </Form.Submit>
        </Form>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
