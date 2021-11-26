import React, { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";

import { Link } from "react-router-dom";

import { History } from "history";
import { useHistory } from "react-router-dom";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import EmailIcon from "@mui/icons-material/Email";

import { useAppDispatch, useAppSelector } from "../../../hooks";

import { signin } from "../../../store/auth/actions";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const history = useHistory<History>();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSignIn = () => {
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, [token, history]);

  return (
    <AuthLayout>
      <div className={classes.container}>
        <p className={classes.title}>Zaloguj się</p>
        <div className={classes.inputs}>
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
          <div className={classes.passwordContainer}>
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
            <Link to="/auth/forgot-password" className={classes.forgotPassword}>
              Zapomniałem hasła
            </Link>
          </div>
        </div>
        <MainButton
          isOutline={false}
          text="Zaloguj się"
          onClick={handleSignIn}
          type="submit"
        />
        <div className={classes.changeAuth}>
          <p className={classes.changeAuth__label}>Nie posiadasz konta?</p>
          <Link to="/auth/signup" className={classes.changeAuth__link}>
            Dołącz już teraz!
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
