import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import { ThemeProvider } from "@mui/material/styles";

import { Link } from "react-router-dom";

import AuthLayout from "../";
import classes from "./index.module.scss";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import { mainTheme } from "../../../themes";
import EmailIcon from "@mui/icons-material/Email";

const Register: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [text, setText] = useState<string>("");

  return (
    <AuthLayout>
      <form className={classes.container}>
        <p className={classes.title}>Zarejestruj się</p>
        <ThemeProvider theme={mainTheme}>
          <div className={classes.inputs}>
            <FormControl
              sx={{ m: 1, width: "50ch" }}
              variant="standard"
              color="primary"
            >
              <TextInput
                text={text}
                setText={setText}
                label="Email"
                icon={<EmailIcon />}
              />
            </FormControl>
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
            <FormControl
              sx={{ m: 1, width: "50ch" }}
              variant="standard"
              color="primary"
            >
              <PasswordInput
                password={passwordConfirm}
                setPassword={setPasswordConfirm}
                label="Powtórz hasło"
              />
            </FormControl>
          </div>
        </ThemeProvider>
        <MainButton
          isOutline={false}
          text="Zarejestruj się"
          onClick={() => {}}
        />
        <div className={classes.changeAuth}>
          <p className={classes.changeAuth__label}>Posiadasz już konto?</p>
          <Link to="/signin" className={classes.changeAuth__link}>
            Zaloguj się!
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
