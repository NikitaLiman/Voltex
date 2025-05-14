"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  registerSchema,
  TformRegisterValues,
} from "./auth-models/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { FormInput } from "./auth-models/form-components/form-input";
import Styles from "../sass/SassComp/profilePgae.module.scss";
import { updateUserInput } from "@/app/actions";

interface Props {
  data: User;
}

export const ProfilePage: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: data.fullname,
      confirmPassword: "",
      email: data.email,
      password: "",
    },
  });

  const onSubmit = async (data: TformRegisterValues) => {
    try {
      await updateUserInput({
        email: data.email,
        fullname: data.fullname,
        password: data.password,
      });

      toast.success("Data updated");
    } catch (error) {
      console.log(error);
      toast.error("Can not login ");
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className={Styles.container}>
      <h1 style={{ padding: "10px 0" }}>Personal Data | {data.fullname}</h1>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={Styles.form}>
            <FormInput label="E-Mail" name="email" required={true} />
            <FormInput label="Fullname" name="fullname" required={true} />
            <FormInput label="Password" name="password" required={true} />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              required={true}
            />
          </div>

          <button
            disabled={form.formState.isSubmitting}
            type="submit"
            className={Styles.Save}
          >
            Save
          </button>

          <button
            className={Styles.logOut}
            onClick={onClickSignOut}
            disabled={form.formState.isSubmitting}
            type="button"
          >
            Log Out
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
