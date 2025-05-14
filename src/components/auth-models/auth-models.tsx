"use client";
import React from "react";
import Styles from "../../sass/authModel.module.scss";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { LogInForm } from "./forms/logIn-form";
import { RegisterForm } from "./forms/register-form";
interface Props {
  onClose: () => void;
}

export const AuthModel: React.FC<Props> = ({ onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwithType = () => {
    setType(type === "login" ? "register" : "login");
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  });
  const handleClose = () => {
    onClose();
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.form}>
        <h1>Sign In</h1>
        <div className={Styles.form__content}>
          <div className={Styles.sigIn}>
            {type === "login" ? (
              <LogInForm onClose={handleClose} />
            ) : (
              <RegisterForm onClose={handleClose} />
            )}
          </div>
          <div className={Styles.bySocial}>
            <div
              onClick={() =>
                signIn("github", {
                  redirect: true,
                  callbackUrl: "/",
                })
              }
              className={Styles.github}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                alt=""
              />
              <p>GitHub</p>
            </div>{" "}
            <div
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: "/",
                })
              }
              className={Styles.Google}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                alt=""
              />
              <p>Google</p>
            </div>
          </div>
        </div>
        <div className={Styles.btn}>
          <button type="button" onClick={onSwithType}>
            {type === "login" ? "register" : "login"}
          </button>
        </div>
        <span>
          <X onClick={onClose} />
        </span>
      </div>
    </div>
  );
};
