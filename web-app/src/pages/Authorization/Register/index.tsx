import React, { useState, useEffect } from "react";
import validator from "validator";

import FormControl from "@mui/material/FormControl";

import { History } from "history";
import { Link, useHistory } from "react-router-dom";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import EmailIcon from "@mui/icons-material/Email";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { checkEmail, setStatus } from "../../../store/auth/actions";
import { toastError } from "../../../utils/toasts";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const history = useHistory<History>();

  const [password, setPassword] = useState<string>(
    localStorage.getItem("password") ?? ""
  );
  const [passwordConfirm, setPasswordConfirm] = useState<string>(
    localStorage.getItem("passwordConfirm") ?? ""
  );
  const [email, setEmail] = useState<string>(
    localStorage.getItem("email") ?? ""
  );

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<boolean>(false);

  const handleRegister = () => {
    setPasswordConfirmError(false);
    setEmailError(false);

    if (!email || !password || !passwordConfirm) {
      toastError("All fields are required");
      return;
    }

    if (!validator.isEmail(email)) {
      toastError("Invalid email address");
      setEmailError(true);
      return;
    }

    if (password !== passwordConfirm) {
      toastError("Password confirm differs from password");
      setPasswordConfirmError(true);
      return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("passwordConfirm", passwordConfirm);
    dispatch(checkEmail(email));
  };

  useEffect(() => {
    if (status === "fail") {
      setEmailError(true);
    }
    if (status === "success") {
      dispatch(setStatus(null));
      history.push(`${history.location.pathname}/fill-data`);
    }
  }, [status, history, dispatch]);

  return (
    <AuthLayout>
      <div className={classes.container}>
        <p className={classes.title}>Zarejestruj się</p>
        <div className={classes.inputs}>
          <FormControl
            className={classes.input}
            variant="standard"
            color="primary"
            error={emailError}
          >
            <TextInput
              text={email}
              setText={setEmail}
              label="Email"
              icon={<EmailIcon />}
            />
          </FormControl>
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
        </div>
        <MainButton
          isOutline={false}
          text="Zarejestruj się"
          // onClick={() => {
          //   history.push(`${history.location.pathname}/fill-data`);
          // }}
          onClick={handleRegister}
        />
        <div className={classes.changeAuth}>
          <p className={classes.changeAuth__label}>Posiadasz już konto?</p>
          <Link to="/auth/signin" className={classes.changeAuth__link}>
            Zaloguj się!
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
