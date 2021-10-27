import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { History } from "history";
import { useHistory } from "react-router-dom";

import AuthLayout from "../../../layout/AuthLayout";
import classes from "./index.module.scss";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import { mainTheme } from "../../../themes";
import PersonIcon from "@mui/icons-material/Person";

const AdditionalDataPage: React.FC = () => {
  const history = useHistory<History>();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date(Date.now()));
  const [gender, setGender] = useState<string>("");

  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

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
              label="Imię"
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
              label="Nazwisko"
              icon={<PersonIcon />}
            />
          </FormControl>
          <FormControl
            className={classes.input}
            variant="standard"
            color="primary"
          >
            <TextInput
              text={username}
              setText={setUsername}
              label="Pseudonim"
              icon={<PersonIcon />}
            />
          </FormControl>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <MobileDatePicker
              label="Wybierz datę urodzenia"
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
              value="Kobieta"
              control={<Radio />}
              label="Kobieta"
            />
            <FormControlLabel
              value="Mężczyzna"
              control={<Radio />}
              label="Mężczyzna"
            />
          </RadioGroup>
        </FormControl>
        <MainButton
          isOutline={false}
          text="Zatwierdź"
          onClick={() => {
            history.push(`/signup/choose-photo`);
          }}
        />
      </form>
    </AuthLayout>
  );
};

export default AdditionalDataPage;
