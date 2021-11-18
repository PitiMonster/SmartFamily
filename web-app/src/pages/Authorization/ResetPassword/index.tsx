import React, { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useParams } from "react-router-dom";

import { History } from "history";
import { useHistory } from "react-router-dom";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import PasswordInput from "../../../components/inputs/PasswordInput";

import MainButton from "../../../components/buttons/MainButton";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { resetPassword, setStatus } from "../../../store/auth/actions";

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const { id } = useParams<{ id: string }>();

  const history = useHistory<History>();

  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<boolean>(false);

  useEffect(() => {
    if (status === "success") {
      toastSuccess("Password reset successfully\nSign in now");
      setStatus(null);
      history.replace("/auth/signin");
    }
  }, [status]);

  const handleResetPassword = () => {
    setPasswordConfirmError(false);

    if (!password || !passwordConfirm) {
      toastError("All fields are required");
      return;
    }

    if (password !== passwordConfirm) {
      toastError("Password confirm differs from password");
      setPasswordConfirmError(true);
      return;
    }

    dispatch(resetPassword(password, passwordConfirm, id));
  };

  return (
    <AuthLayout>
      <div className={classes.container}>
        <p className={classes.title}>Reset password</p>
        <FormControl
          className={classes.input}
          variant="standard"
          color="primary"
        >
          <PasswordInput
            password={password}
            setPassword={setPassword}
            label="Hasło"
          />
        </FormControl>
        <FormControl
          className={classes.input}
          variant="standard"
          color="primary"
          error={passwordConfirmError}
        >
          <PasswordInput
            password={passwordConfirm}
            setPassword={setPasswordConfirm}
            label="Powtórz hasło"
          />
        </FormControl>
        <MainButton
          isOutline={false}
          text="Reset password"
          onClick={handleResetPassword}
        />
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
