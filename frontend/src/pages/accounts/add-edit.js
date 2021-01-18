import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import * as ROUTES from 'constants/routes';
import * as ROLE from 'constants/role';
import { NavbarContainer } from 'containers/navbar';
import { PageContainer } from 'containers/page';
import { FooterContainer } from 'containers/footer';
import { Form, Loader } from 'components';
import { alertService, accountService } from '_services';

const ROLES = [
  { id: 1, name: ROLE.User },
  { id: 2, name: ROLE.Manager },
  { id: 3, name: ROLE.ServiceProvider },
];

export default function AccountAddEdit({ match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const { t } = useTranslation();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (id) {
      setIsFetching(true);

      accountService
        .getById(id)
        .then((res) => {
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setEmail(res.email);
          setRoleId(res.role?.id);
        })
        .catch((error) => setError(error))
        .finally(() => setIsFetching(false));
    }
  }, [id]);

  const isInvalid = (fieldName) => validationErrors.some((el) => el.indexOf(t(fieldName)) > -1);

  const isFormValid = async () => {
    setValidationErrors([]);

    let validationObject = {
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email().required(t('Email is required')),
      roleId: Yup.string().required(t('Role is required')),
    };

    if (isAddMode || password.length || confirmPassword.length) {
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
      .validate(
        { firstName, lastName, email, roleId, password, confirmPassword },
        { abortEarly: false }
      )
      .then(() => true)
      .catch((err) => {
        setValidationErrors(err.errors);
        return false;
      });
  };

  const createAccount = (fields) => {
    accountService
      .create(fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: ROUTES.ACCOUNTS });
        alertService.success(t('Account created'));
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error);
      });
  };

  const updateAccount = (id, fields) => {
    accountService
      .update(id, fields)
      .then(() => {
        setSubmitting(false);
        history.push({ pathname: `/accounts/${id}/details` });
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

    if (isAddMode) {
      createAccount({
        firstName,
        lastName,
        email,
        roleId,
        password,
        confirmPassword,
      });
    } else {
      updateAccount(id, {
        firstName,
        lastName,
        email,
        roleId,
        password,
        confirmPassword,
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
              <Form.Title>{isAddMode ? t('Add Account') : t('Edit Account')}</Form.Title>
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

              <Form.Select
                value={roleId}
                className={isInvalid('Role') ? 'invalid' : ''}
                onBlur={({ target }) => setRoleId(target.value)}
                onChange={({ target }) => setRoleId(target.value)}
              >
                <Form.Option value="">{t('--- Select role ---')}</Form.Option>
                {ROLES.map((role) => (
                  <Form.Option value={role.id} key={role.id}>
                    {role.name}
                  </Form.Option>
                ))}
              </Form.Select>

              <Form.ButtonsContainer>
                <Form.Submit type="submit" className="btn btn-block">
                  {isSubmitting && <Loader />}
                  {t('Save')}
                </Form.Submit>
                <Link to={ROUTES.ACCOUNTS} className="btn btn-secondary btn-block">
                  {t('Cancel')}
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
