import React from 'react';
import { RequiredSymbol } from './required';
import { FormError } from './form-error';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, placeholder, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const error = errors[name]?.message as string;
  const onClickGear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label} {required && <RequiredSymbol />}
        </label>
      )}{' '}
      <div style={{ position: 'relative', maxWidth: '500px' }}>
        <input
          id={name}
          style={{ width: '100%' }}
          type="text"
          {...register(name)}
          placeholder={placeholder}
          {...props}
        />

        {value && (
          <button
            style={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-40%)',
            }}>
            <X onClick={onClickGear} size={16} />
          </button>
        )}
      </div>
      {error && <FormError text={error} />}
    </>
  );
};
