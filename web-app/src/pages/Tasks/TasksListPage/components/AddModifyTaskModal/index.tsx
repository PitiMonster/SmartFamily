import { useEffect, useState } from "react";
import moment from "moment";

import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import classes from "./index.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { setStatus, updateBackdrop } from "../../../../../store/utils/actions";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";
import { toastError, toastSuccess } from "../../../../../utils/toasts";
import { createTask } from "../../../../../store/tasks/actions";

const AddModifyTaskModal: React.FC<{
  groupId: string;
  childId: string;
}> = ({ groupId, childId }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);
  const [taskName, setTaskName] = useState<string>("");
  const [taskCreatedAt, setCreatedAt] = useState<Date>(new Date(Date.now()));
  const [taskDeadline, setTaskDeadline] = useState<Date | null>(
    new Date(Date.now())
  );
  const [taskPoints, setTaskPoints] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      toastSuccess("Task created successfully");
      dispatch(updateBackdrop(false));
      dispatch(setStatus(null));
    }
  }, [status, dispatch]);

  const handleDateChange = (newValue: Date | null) => {
    setTaskDeadline(newValue);
  };

  const handleSave = () => {
    if (!taskName || !taskDeadline || !taskPoints) {
      toastError("Name, deadline and points fields are required");
      return;
    }
    // if (taskDeadline < taskCreatedAt) {
    //   toastError("Task cannot have deadline in past");
    //   return;
    // }
    if (+taskPoints && +taskPoints <= 0) {
      toastError("Points field value must be positive number");
      return;
    }

    dispatch(
      createTask(
        groupId,
        childId,
        taskName,
        taskDeadline,
        taskPoints,
        taskDescription
      )
    );
  };

  // useEffect(() => {
  //   setItemName(name);
  //   setCreatedAt(createdAt);
  //   setTaskDeadline(deadline);
  //   setTaskPoints(points.toString());
  //   setTaskDescription(description);
  // }, [name, createdAt, deadline, points, description]);

  return (
    <div className={classes.modal}>
      <p className={classes.title}>Add task</p>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={taskName} setText={setTaskName} label="Item name" />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={moment(taskCreatedAt).format("DD/MM/YYYY, hh:mm")}
          setText={setTaskName}
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
      <MainButton isOutline={true} text="Save" onClick={handleSave} />
    </div>
  );
};

export default AddModifyTaskModal;
