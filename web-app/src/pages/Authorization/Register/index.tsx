import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

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

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const history = useHistory<History>();

  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<boolean>(false);

  const handleRegister = () => {
    setPasswordConfirmError(false);
    setEmailError(false);

    if (password !== passwordConfirm) {
      toast.error("Password confirm differs from password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "registerPasswordError",
      });
      setPasswordConfirmError(true);
      return;
    }
    dispatch(checkEmail(email, password, passwordConfirm));
  };

  useEffect(() => {
    if (status === "fail") {
      setEmailError(true);
    }
    if (status === "success") {
      toast.success("Data correct!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "registerDataCorrect",
      });
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
