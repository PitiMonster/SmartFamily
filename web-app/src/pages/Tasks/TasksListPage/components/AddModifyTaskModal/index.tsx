import { useEffect, useState } from "react";
import moment from "moment";

import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import classes from "./index.module.scss";

import { useAppDispatch } from "../../../../../hooks";
import { updateBackdrop } from "../../../../../store/utils/action";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";

const AddModifyTaskModal: React.FC<{
  title: string;
  name: string;
  createdAt: Date;
  deadline: Date;
  points: number;
  description: string;
}> = ({ title, name, createdAt, deadline, points, description }) => {
  const dispatch = useAppDispatch();
  const [itemName, setItemName] = useState<string>("");
  const [taskCreatedAt, setCreatedAt] = useState<Date>(new Date(Date.now()));
  const [taskDeadline, setTaskDeadline] = useState<Date | null>(
    new Date(Date.now())
  );
  const [taskPoints, setTaskPoints] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  const handleDateChange = (newValue: Date | null) => {
    setTaskDeadline(newValue);
  };

  useEffect(() => {
    setItemName(name);
    setCreatedAt(createdAt);
    setTaskDeadline(deadline);
    setTaskPoints(points.toString());
    setTaskDescription(description);
  }, [name, createdAt, deadline, points, description]);

  return (
    <div className={classes.modal}>
      <p className={classes.title}>{title}</p>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={itemName} setText={setItemName} label="Item name" />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={moment(taskCreatedAt).format("DD/MM/YYYY, hh:mm")}
          setText={setItemName}
          label="Created at"
          disabled={true}
        />
      </FormControl>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MobileDatePicker
          label="Deadline"
          inputFormat="MM/dd/yyyy"
          value={taskDeadline}
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
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={taskPoints}
          setText={setTaskPoints}
          label="Points for task"
        />
      </FormControl>

      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        maxRows={10}
        placeholder="Item description"
        value={taskDescription}
        onChange={(event) => setTaskDescription(event.target.value)}
      />
      <MainButton isOutline={true} text="Save" onClick={() => {}} />
    </div>
  );
};

export default AddModifyTaskModal;
