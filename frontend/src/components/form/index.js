import React from 'react';
import './styles/form.scss';

export default function Form({ children, ...restProps }) {
  return (
    <form className="form card" {...restProps}>
      {children}
    </form>
  );
}

Form.Error = function FormError({ children, ...restProps }) {
  return (
    <div className="form__error" {...restProps}>
      {children}
    </div>
  );
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <h2 {...restProps}>{children}</h2>;
};

Form.Input = function FormInput({ ...restProps }) {
  return (
    <div className="form__control">
      <input {...restProps} />
    </div>
  );
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return (
    <button type="button" className="btn btn-primary" {...restProps}>
      {children}
    </button>
  );
};
