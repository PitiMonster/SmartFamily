import { useEffect, useState } from "react";

import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useHistory } from "react-router-dom";
import { History } from "history";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { setStatus, updateBackdrop } from "../../../../../store/utils/actions";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";
import {
  addCalendarEvent,
  getOneCalendarEvent,
  updateCalendarEvent,
} from "../../../../../store/calendar/actions";
import { toastError, toastSuccess } from "../../../../../utils/toasts";

const AddModifyEventModal: React.FC<{ id?: string; initDate?: Date }> = ({
  id,
  initDate,
}) => {
  const dispatch = useAppDispatch();
  const { groupId } = useParams<{ groupId: string }>();
  const selectedEvent = useAppSelector((store) => store.calendar.selectedEvent);
  const requestStatus = useAppSelector((store) => store.utils.status);

  const [eventName, setEventName] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | null>(initDate ?? null);
  const [description, setDescription] = useState<string>("");

  const [currentAction, setCurrentAction] = useState<
    "update" | "create" | null
  >();

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getOneCalendarEvent(groupId, id));
    }
  }, [id, dispatch, groupId]);

  useEffect(() => {
    if (id) {
      setEventName(selectedEvent?.name ?? "");
      setDateTime(selectedEvent?.date ?? new Date(Date.now()));
      setDescription(selectedEvent?.description ?? "");
    }
  }, [selectedEvent, id]);

  useEffect(() => {
    if (requestStatus === "success") {
      let toastText = "Action completed successfully";
      switch (currentAction) {
        case "update":
          toastText = "Event updated successfully";
          break;
        case "create":
          toastText = "Event created successfully";
          break;
        default:
          break;
      }
      toastSuccess(toastText);
      dispatch(updateBackdrop(false));
      dispatch(setStatus(null));
    }
  }, [requestStatus, currentAction, dispatch]);

  const handleDateTime = (newValue: Date | null) => {
    setDateTime(newValue);
  };

  const handleSave = () => {
    if (!eventName || !dateTime) {
      toastError("Name and date fields are required");
      return;
    }

    if (id) {
      dispatch(
        updateCalendarEvent(
          groupId,
          id,
          eventName,
          dateTime as Date,
          description
        )
      );
      setCurrentAction("update");
    } else {
      dispatch(
        addCalendarEvent(groupId, eventName, dateTime as Date, description)
      );
      setCurrentAction("create");
    }
  };

  return (
    <div className={classes.modal}>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={eventName} setText={setEventName} label="Event name" />
      </FormControl>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DateTimePicker
          label="Event date time"
          inputFormat="dd/MM/yyyy"
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
      <MainButton isOutline={true} text="Save" onClick={handleSave} />
    </div>
  );
};

export default AddModifyEventModal;
