import React from 'react';

const renderField = (props: any) => {
  const { input, label, className, placeholder, type, meta: { touched, error } } = props;
  return (
    <div className={label ? "row" : ""}>
      {label && <label className="col-sm-3 col-form-label">{label}</label>}
      <input className={className} {...input} type={type} placeholder={placeholder} />
      {touched && error && <span className="text-danger form-field-error">{error}</span>}
    </div>
  )
}

export default renderField;
