import { useState, useEffect } from "react";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useAppDispatch } from "../../../../../hooks";
import { updateBackdrop } from "../../../../../store/utils/action";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";

const AddExpenseModal = () => {
  const dispatch = useAppDispatch();

  const [expenseName, setExpenseName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    // set expense data if provided
  }, []);

  return (
    <div className={classes.modal}>
      <p className={classes.title}>Add expense</p>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={expenseName}
          setText={setExpenseName}
          label="Expense name"
        />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={price} setText={setPrice} label="Expense value" />
      </FormControl>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        maxRows={10}
        placeholder="Expense description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <MainButton isOutline={true} text="Save" onClick={() => {}} />
    </div>
  );
};

export default AddExpenseModal;
