import React, { useState, useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useHistory } from "react-router-dom";

import classes from "./index.module.scss";
import parentsPath from "../../../assets/images/parents.png";
import sonPath from "../../../assets/images/son.png";

import AuthLayout from "../../../layout/AuthLayout";
import MainButton from "../../../components/buttons/MainButton";
import { toastSuccess } from "../../../utils/toasts";

const ChooseRolePage: React.FC = () => {
  const history = useHistory<History>();

  const [role, setRole] = useState<"parent" | "child">(
    (localStorage.getItem("role") as "parent" | "child") ?? "parent"
  );

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("role", event.target.value);
    setRole((event.target as HTMLInputElement).value as "parent" | "child");
  };

  const handleSave = () => {
    if (role === "child") {
      history.push("/auth/signup/parent-code");
    } else if (role === "parent") {
      // signup
      toastSuccess("Account created successfully!");
    }
  };

  return (
    <AuthLayout>
      <p className={classes.title}>Wybierz rolę użytkownika</p>
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
              value="parent"
              control={<Radio />}
              label="Parent"
            />
          </div>
          <div className={classes.role}>
            <img className={classes.role__image} src={sonPath} alt="son" />
            <FormControlLabel value="child" control={<Radio />} label="Child" />
          </div>
        </RadioGroup>
      </FormControl>
      <MainButton isOutline={false} text="Zatwierdź" onClick={handleSave} />
      <p className={classes.attribiution}>
        Icons made by Freepik from www.flaticon.com
      </p>
    </AuthLayout>
  );
};

export default ChooseRolePage;
