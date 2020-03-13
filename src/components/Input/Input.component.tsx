import React, { ChangeEvent } from 'react';
import './Input.component.css';

interface Props {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: ((event: ChangeEvent<HTMLInputElement>) => void);
  errors: {
    errorMessage: string;
    hasError: boolean;
  }[];
}

export const Input = (props: Props) => {
  const { id, name, placeholder, onChange, type, value, errors } = props;

  const errorsList = errors.map((error, i) => error.hasError
    ? <div className='error-message' key={i}>{error.errorMessage}</div>
    : null)

  return (
    <div className='form-field'>
      <div className='errors-container'>
        {errorsList}
      </div>
      <label>{name}</label>

      <input
        data-testid={name}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

