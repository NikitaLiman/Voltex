import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, registerSchema, TformRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Styles from '../../../../sass/authModel.module.scss';
import { FormInput } from '../../form-components/form-input';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { RegisterUser } from '@/app/actions';

interface Props {
  onClose: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const onSubmit = async (data: TformRegisterValues) => {
    try {
      await RegisterUser({
        email: data.email,
        fullname: data.fullname,
        password: data.password,
      });

      toast.success('User created!');
    } catch (error) {
      console.log(error);
      toast.error('User created yet ');
    }
  };
  const form = useForm<TformRegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      fullname: '',
      confirmPassword: '',
    },
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={Styles.FORM}>
          <div className={Styles.FORM__content}>
            <h1>Register</h1>
            <p>Enter your E-mail & Password to Login </p>
          </div>
        </div>

        <div className={Styles.inputs}>
          <FormInput label="Fullname" name="fullname" required={true} />
          <FormInput label="E-Mail" name="email" required={true} />
          <FormInput label="Password" name="password" required={true} type="password" />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required={true}
          />
        </div>

        <button type="submit" className={Styles.btn}>
          {form.formState.isSubmitting ? 'Enter..' : 'register'}
        </button>
      </form>
    </FormProvider>
  );
};
