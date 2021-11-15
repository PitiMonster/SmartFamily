import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import { ThemeProvider } from "@mui/material/styles";

import { Link } from "react-router-dom";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import { mainTheme } from "../../../themes";
import EmailIcon from "@mui/icons-material/Email";

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [text, setText] = useState<string>("");

  return (
    <AuthLayout>
      <form className={classes.container}>
        <p className={classes.title}>Zaloguj się</p>
        <div className={classes.inputs}>
          <FormControl
            variant="standard"
            color="primary"
            className={classes.input}
          >
            <TextInput
              text={text}
              setText={setText}
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
            <Link to="/forgot-password" className={classes.forgotPassword}>
              Zapomniałem hasła
            </Link>
          </div>
        </div>
        <MainButton isOutline={false} text="Zaloguj się" onClick={() => {}} />
        <div className={classes.changeAuth}>
          <p className={classes.changeAuth__label}>Nie posiadasz konta?</p>
          <Link to="/signup" className={classes.changeAuth__link}>
            Dołącz już teraz!
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
