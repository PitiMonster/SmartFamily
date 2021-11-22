import React, { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { History } from "history";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import PersonIcon from "@mui/icons-material/Person";
import { toastError } from "../../../utils/toasts";
import { checkUsername } from "../../../store/auth/actions";
import { setStatus } from "../../../store/utils/actions";

const AdditionalDataPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);

  const history = useHistory<History>();

  const [name, setName] = useState<string>(localStorage.getItem("name") ?? "");
  const [surname, setSurname] = useState<string>(
    localStorage.getItem("surname") ?? ""
  );
  const [username, setUsername] = useState<string>(
    localStorage.getItem("username") ?? ""
  );
  const [date, setDate] = useState<Date | null>(
    new Date((localStorage.getItem("birthDate") as string) ?? Date.now())
  );
  const [gender, setGender] = useState<"male" | "female">(
    (localStorage.getItem("gender") as "male" | "female") ?? "female"
  );

  const [isUsernameError, setIsUsernameError] = useState<boolean>(false);

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value as "male" | "female");
  };

  const handleSave = () => {
    setIsUsernameError(false);

    if (!name || !surname || !username || !date || !gender) {
      toastError("All fields are required");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("surname", username);
    localStorage.setItem("birthDate", date.toISOString());
    localStorage.setItem("gender", gender);
    localStorage.setItem("username", username);

    dispatch(checkUsername(username));
  };

  useEffect(() => {
    if (status === "fail") {
      setIsUsernameError(true);
    }
    if (status === "success") {
      dispatch(setStatus(null));
      history.push(`/auth/signup/choose-photo`);
    }
  }, [status, history, dispatch]);

  return (
    <AuthLayout>
      <form className={classes.container}>
        <p className={classes.title}>Uzupełnij swoje dane</p>
        <div className={classes.inputs}>
          <FormControl
            className={classes.input}
            variant="standard"
            color="primary"
          >
            <TextInput
              text={name}
              setText={setName}
              label="Name"
              icon={<PersonIcon />}
            />
          </FormControl>
          <FormControl
            className={classes.input}
            variant="standard"
            color="primary"
          >
            <TextInput
              text={surname}
              setText={setSurname}
              label="Surname"
              icon={<PersonIcon />}
            />
          </FormControl>
          <FormControl
            className={classes.input}
            variant="standard"
            color="primary"
            error={isUsernameError}
          >
            <TextInput
              text={username}
              setText={setUsername}
              label="Username"
              icon={<PersonIcon />}
            />
          </FormControl>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <MobileDatePicker
              label="Select your date of birth"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  className={classes.input}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <FormControl component="fieldset" color="primary">
          <RadioGroup
            row
            aria-label="gender"
            name="row-radio-buttons-group"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <MainButton isOutline={false} text="Save" onClick={handleSave} />
      </form>
    </AuthLayout>
  );
};

export default AdditionalDataPage;
