import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import { ThemeProvider } from "@mui/material/styles";

import AuthLayout from "../";
import classes from "./index.module.scss";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import { mainTheme } from "../../../themes";

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [text, setText] = useState<string>("");

  return (
    <AuthLayout>
      <form className={classes.container}>
        <p className={classes.title}>Zaloguj się</p>
        <ThemeProvider theme={mainTheme}>
          <div className={classes.inputs}>
            <FormControl
              sx={{ m: 1, width: "50ch" }}
              variant="standard"
              color="primary"
            >
              <TextInput text={text} setText={setText} label="Email" />
            </FormControl>
            <div className={classes.passwordContainer}>
              <FormControl
                sx={{ m: 1, width: "50ch" }}
                variant="standard"
                color="primary"
              >
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  label="Hasło"
                />
              </FormControl>
              <a href="#" className={classes.forgotPassword}>
                Zapomniałem hasła
              </a>
            </div>
          </div>
        </ThemeProvider>
        <MainButton isOutline={false} text="Zaloguj się" onClick={() => {}} />
        <div className={classes.toRegister}>
          <p className={classes.toRegister__label}>Nie posiadasz konta?</p>
          <a href="#" className={classes.toRegister__link}>
            Dołącz już teraz!
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
