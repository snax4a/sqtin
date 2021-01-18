import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import * as ROUTES from 'constants/routes';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Form, Loader } from 'components';
import { alertService, accountService } from '_services';

export default function AccountSettings() {
  const { t } = useTranslation();
  const user = accountService.userValue;
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const isInvalid = (fieldName) => validationErrors.some((el) => el.indexOf(t(fieldName)) > -1);

  const isFormValid = async () => {
    setValidationErrors([]);

    let validationObject = {
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email().required(t('Email is required')),
    };

    if (password.length || confirmPassword.length) {
      const passwordSchemaRules = {
        password: Yup.string()
          .min(6, t('Password must be at least 6 characters'))
          .required(t('Password is required')),
        confirmPassword: Yup.string()
          .required(t('Confirm Password is required'))
          .oneOf([Yup.ref('password')], t('Passwords must match')),
      };

      validationObject = Object.assign(validationObject, passwordSchemaRules);
    }

    const validationSchema = Yup.object().shape(validationObject);

    return validationSchema
      .validate({ firstName, lastName, email, password, confirmPassword }, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        setValidationErrors(err.errors);
        return false;
      });
  };

  const updateAccount = (id, fields) => {
    accountService
      .update(id, fields)
      .then(() => {
        setSubmitting(false);
        accountService.refreshToken();
        alertService.success(t('Account updated'));
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

    updateAccount(user.id, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
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
          <Form.Title>{t('Account Settings')}</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          {validationErrors.length > 0 && (
            <Form.Error>
              {validationErrors.map((e, i) => (
                <p key={i}>{e}</p>
              ))}
            </Form.Error>
          )}
          <Form.Input
            placeholder={t('First Name')}
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
            className={isInvalid('First Name') ? 'invalid' : ''}
          />

          <Form.Input
            placeholder={t('Last Name')}
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
            className={isInvalid('Last Name') ? 'invalid' : ''}
          />

          <Form.Input
            placeholder={t('Email')}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className={isInvalid('Email') ? 'invalid' : ''}
          />

          <Form.Select disabled>
            <Form.Option value="">{user.role?.name}</Form.Option>
          </Form.Select>

          <Form.Input
            type="password"
            placeholder={t('Password')}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className={isInvalid('Password') ? 'invalid' : ''}
          />

          <Form.Input
            type="password"
            placeholder={t('Confirm Password')}
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            className={isInvalid('Confirm Password') ? 'invalid' : ''}
          />

          <Form.ButtonsContainer>
            <Form.Submit type="submit" className="btn btn-block">
              {isSubmitting && <Loader />}
              {t('Save')}
            </Form.Submit>
            <Link to={ROUTES.DASHBOARD} className="btn btn-secondary btn-block">
              {t('Cancel')}
            </Link>
          </Form.ButtonsContainer>
        </Form>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
