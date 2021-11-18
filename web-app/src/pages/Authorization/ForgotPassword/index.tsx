import React, { useState, useEffect } from "react";
import validator from "validator";

import FormControl from "@mui/material/FormControl";

import { useAppDispatch, useAppSelector } from "../../../hooks";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import EmailIcon from "@mui/icons-material/Email";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { forgotPassword, setStatus } from "../../../store/auth/actions";

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (status === "success") {
      toastSuccess(
        "A password reset email has been sent to your email address"
      );
      dispatch(setStatus(null));
    }
  }, [status, dispatch]);

  const handleSend = () => {
    if (!validator.isEmail(email)) {
      toastError("Invalid email address format");
      return;
    }
    dispatch(forgotPassword(email));
  };

  return (
    <AuthLayout>
      <form className={classes.container}>
        <p className={classes.title}>Forgot password</p>
        <FormControl
          variant="standard"
          color="primary"
          className={classes.input}
        >
          <TextInput
            text={email}
            setText={setEmail}
            label="Email"
            icon={<EmailIcon />}
          />
        </FormControl>
        <MainButton isOutline={false} text="Send" onClick={handleSend} />
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
