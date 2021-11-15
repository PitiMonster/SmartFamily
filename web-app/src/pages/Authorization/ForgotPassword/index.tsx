import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import EmailIcon from "@mui/icons-material/Email";

const ForgotPasswordPage: React.FC = () => {
  const [text, setText] = useState<string>("");

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
            text={text}
            setText={setText}
            label="Email"
            icon={<EmailIcon />}
          />
        </FormControl>
        <MainButton isOutline={false} text="Send" onClick={() => {}} />
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
