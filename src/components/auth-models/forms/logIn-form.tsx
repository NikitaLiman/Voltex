import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TformLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Styles from "../../../sass/authModel.module.scss";
import { FormInput } from "../form-components/index";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose: VoidFunction;
}

export const LogInForm: React.FC<Props> = ({ onClose }) => {
  const onSubmit = async (data: TformLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        return toast.error("Cannot Enter To account");
      }
      toast.success("You Entered to Profile");
      onClose?.();
    } catch (error) {
      console.log(error);
      toast.error("Can not login ");
    }
  };
  const form = useForm<TformLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={Styles.FORM}>
          <div className={Styles.FORM__content}>
            <h1>Log In</h1>
            <p>Enter your E-mail & Password to Login </p>
          </div>
        </div>

        <div className={Styles.inputs}>
          <FormInput label="E-Mail" name="email" required={true} />
          <FormInput
            label="Password"
            name="password"
            type="password"
            required={true}
          />
        </div>

        <button type="submit" className={Styles.btn}>
          {form.formState.isSubmitting ? "Enter.." : "logIn"}
        </button>
      </form>
    </FormProvider>
  );
};
