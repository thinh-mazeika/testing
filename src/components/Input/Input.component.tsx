import React, {ChangeEvent} from 'react';

interface Props {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: ((event: ChangeEvent<HTMLInputElement>) => void);
}

export const Input = (props:Props) => {
  const {id, name, placeholder, onChange, type, value} = props;
  return (
    <div>
      <label>{name}</label>

      <input
        id = {id}
        name = {name}
        placeholder = {placeholder}
        type = {type}
        value = {value}
        onChange = {onChange}
      />
    </div>
  )
}

