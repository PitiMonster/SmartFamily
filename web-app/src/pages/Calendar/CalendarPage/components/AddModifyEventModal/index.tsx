import { useEffect, useState } from "react";

import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useAppDispatch } from "../../../../../hooks";
import { updateBackdrop } from "../../../../../store/utils/action";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";

const AddModifyEventModal: React.FC<{ id?: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [eventName, setEventName] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | null>();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      // get event data from db and fill fields
    }
  }, [id]);

  const handleDateTime = (newValue: Date | null) => {
    setDateTime(newValue);
  };

  return (
    <div className={classes.modal}>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={eventName} setText={setEventName} label="Event name" />
      </FormControl>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DateTimePicker
          label="Event date time"
          inputFormat="MM/dd/yyyy"
          value={dateTime}
          onChange={handleDateTime}
          renderInput={(params) => <TextField variant="standard" {...params} />}
        />
      </LocalizationProvider>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        maxRows={10}
        placeholder="Event description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <MainButton isOutline={true} text="Save" onClick={() => {}} />
    </div>
  );
};

export default AddModifyEventModal;
