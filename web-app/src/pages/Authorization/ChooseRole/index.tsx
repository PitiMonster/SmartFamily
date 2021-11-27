import React, { useState, useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useHistory } from "react-router-dom";
import { History } from "history";

import { useAppDispatch, useAppSelector } from "../../../hooks";

import classes from "./index.module.scss";
import parentsPath from "../../../assets/images/parents.png";
import sonPath from "../../../assets/images/son.png";

import AuthLayout from "../../../layout/AuthLayout";
import MainButton from "../../../components/buttons/MainButton";
import { toastSuccess } from "../../../utils/toasts";
import { signup } from "../../../store/auth/actions";
import { setStatus } from "../../../store/utils/actions";

const ChooseRolePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);

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
    const name = localStorage.getItem("name") as string;
    const surname = localStorage.getItem("surname") as string;
    const email = localStorage.getItem("email") as string;
    const password = localStorage.getItem("password") as string;
    const passwordConfirm = localStorage.getItem("passwordConfirm") as string;
    const username = localStorage.getItem("username") as string;
    const birthDate = localStorage.getItem("birthDate") as string;
    const sex = localStorage.getItem("gender") as "male" | "female";
    const profilePhoto = localStorage.getItem("photoUrl") as string;

    dispatch(
      signup(
        name,
        surname,
        username,
        email,
        role,
        birthDate,
        sex,
        profilePhoto,
        password,
        passwordConfirm
      )
    );
  };

  useEffect(() => {
    if (status === "success") {
      if (role === "parent") {
        toastSuccess("You have successfully created account!\nSign in now!");
        history.replace("/auth/signin");
        localStorage.clear();
      } else if (role === "child") {
        history.replace("/auth/signup/parent-code");
      }
      dispatch(setStatus(null));
    }
  }, [status, dispatch, history, role]);

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
