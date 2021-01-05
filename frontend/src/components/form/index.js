import React from 'react';
import './styles/form.scss';

export default function Form({ className, children, ...restProps }) {
  const classNames = `form card ${className}`;
  return (
    <form className={classNames} {...restProps}>
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

Form.Select = function FormSelect({ children, ...restProps }) {
  return (
    <div className="form__control">
      <select {...restProps}>{children}</select>
    </div>
  );
};

Form.Option = function FormOption({ children, ...restProps }) {
  return <option {...restProps}>{children}</option>;
};

Form.Submit = function FormSubmit({ className, children, ...restProps }) {
  const classNames = `btn btn-primary ${className}`;
  return (
    <button type="button" className={classNames} {...restProps}>
      {children}
    </button>
  );
};

Form.ButtonsContainer = function FormButtonsContainer({ children, ...restProps }) {
  return (
    <div className="form__buttons-container" {...restProps}>
      {children}
    </div>
  );
};
