import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import { ThemeProvider } from "@mui/material/styles";

import AuthLayout from "../";
import classes from "./index.module.scss";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";
import TextButtonInput from "../../../components/inputs/TextButtonInput";
import MainButton from "../../../components/buttons/MainButton";
import { mainTheme } from "../../../themes";
import CreateIcon from "@mui/icons-material/Create";

const ParentCode: React.FC = () => {
  const [parentId, setParentId] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");

  return (
    <AuthLayout>
      <p className={classes.title}>Dodaj swojego rodzica</p>
      <ThemeProvider theme={mainTheme}>
        <div className={classes.inputs}>
          <FormControl
            sx={{ m: 1, width: "50ch" }}
            variant="standard"
            color="primary"
          >
            <TextButtonInput
              text={parentId}
              setText={setParentId}
              label="Identyfikator rodzica"
              buttonText="Wyślij kod"
              buttonAction={() => {}}
            />
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "50ch" }}
            variant="standard"
            color="primary"
          >
            <TextInput
              text={emailCode}
              setText={setEmailCode}
              label="Kod z email rodzica"
              icon={<CreateIcon />}
            />
          </FormControl>
        </div>
      </ThemeProvider>
      <MainButton isOutline={false} text="Zaloguj się" onClick={() => {}} />
    </AuthLayout>
  );
};

export default ParentCode;
