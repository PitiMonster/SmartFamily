import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Collapse from "@mui/material/Collapse";

import classes from "./index.module.scss";

import { useAppDispatch } from "../../../../hooks";
import { updateBackdrop } from "../../../../store/utils/action";

import TextInput from "../../../../components/inputs/TextInput";
import MainButton from "../../../../components/buttons/MainButton";
import { Stack } from "@mui/material";

const AddModifyBudget: React.FC<{ id?: string }> = ({ id }) => {
  const dispatch = useAppDispatch();

  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetValue, setBudgetValue] = useState<string>("");
  const [renewPeriodically, setRenewPeriodically] = useState<boolean>(false);
  const [renewUnitCount, setRenewUnitCount] = useState<string>("");
  const [renewUnit, setRenewUnit] = useState<string>("Day");
  const [autoDelete, setAutoDelete] = useState<boolean>(false);
  const [autoDeleteDate, setAutoDeleteDate] = useState<Date | null>();

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      // get budget data
    }
  }, [id]);

  const handleDateChange = (newValue: Date | null) => {
    setAutoDeleteDate(newValue);
  };

  const handleRenewUnitChange = (event: SelectChangeEvent) => {
    setRenewUnit(event.target.value as string);
  };

  return (
    <div className={classes.modal}>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={budgetName}
          setText={setBudgetName}
          label="Budget name"
        />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={budgetValue}
          setText={setBudgetValue}
          label="Budget value"
        />
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={renewPeriodically}
            onChange={(event) => setRenewPeriodically(event.target.checked)}
          />
        }
        label="Renew periodically"
      />
      <Collapse in={renewPeriodically}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          className={classes.period}
        >
          <FormControl
            variant="standard"
            color="primary"
            className={classes.period__input}
          >
            <TextInput
              text={renewUnitCount}
              setText={setRenewUnitCount}
              label="Amount"
            />
          </FormControl>
          <FormControl className={classes.period__input}>
            <InputLabel id="demo-simple-select-label">Period</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={renewUnit}
              label="Period"
              onChange={handleRenewUnitChange}
            >
              <MenuItem value={"Day"}>Days</MenuItem>
              <MenuItem value={"Month"}>Months</MenuItem>
              <MenuItem value={"Year"}>Years</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Collapse>
      <FormControlLabel
        control={
          <Switch
            checked={autoDelete}
            onChange={(event) => setAutoDelete(event.target.checked)}
          />
        }
        label="Delete automatically"
      />
      <Collapse in={autoDelete}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <MobileDatePicker
            label="Wybierz datę urodzenia"
            inputFormat="MM/dd/yyyy"
            value={autoDeleteDate}
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
      </Collapse>
      <MainButton isOutline={true} text="Save" onClick={() => {}} />
    </div>
  );
};

export default AddModifyBudget;
