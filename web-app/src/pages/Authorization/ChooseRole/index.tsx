import React, { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useHistory } from "react-router-dom";

import classes from "./index.module.scss";
import parentsPath from "../../../assets/images/parents.png";
import sonPath from "../../../assets/images/son.png";

import AuthLayout from "../";
import { mainTheme } from "../../../themes";
import MainButton from "../../../components/buttons/MainButton";

const ChooseRolePage: React.FC = () => {
  const history = useHistory<History>();

  const [role, setRole] = useState<string>("");

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value);
  };

  return (
    <AuthLayout>
      <p className={classes.title}>Wybierz rolę użytkownika</p>
      <ThemeProvider theme={mainTheme}>
        <FormControl component="fieldset" color="primary">
          <RadioGroup
            row
            value={role}
            onChange={handleRoleChange}
            className={classes.roles}
          >
            <div className={classes.role}>
              <img
                className={classes.role__image}
                src={parentsPath}
                alt="parents"
              />
              <FormControlLabel
                value="Rodzic"
                control={<Radio />}
                label="Rodzic"
              />
            </div>
            <div className={classes.role}>
              <img className={classes.role__image} src={sonPath} alt="son" />
              <FormControlLabel
                value="Dziecko"
                control={<Radio />}
                label="Dziecko"
              />
            </div>
          </RadioGroup>
        </FormControl>
      </ThemeProvider>
      <MainButton
        isOutline={false}
        text="Zatwierdź"
        onClick={() => {
          history.push("/signup/parent-code");
        }}
      />
    </AuthLayout>
  );
};

export default ChooseRolePage;
