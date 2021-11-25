import { useState, useEffect } from "react";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { setStatus, updateBackdrop } from "../../../../../store/utils/actions";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";
import { addExpenseToBudget } from "../../../../../store/budget/actions";
import { toastError, toastSuccess } from "../../../../../utils/toasts";

const AddExpenseModal: React.FC<{ groupId: string; budgetId: string }> = (
  props
) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);

  const [expenseName, setExpenseName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    // set expense data if provided
  }, []);

  useEffect(() => {
    if (status === "success") {
      toastSuccess("Expense added successfully");
      dispatch(setStatus(null));
      dispatch(updateBackdrop(false));
    }
  }, [status, dispatch]);

  const handleSave = () => {
    if (!expenseName || !price) {
      toastError("Expense name and price are required");
      return;
    }

    dispatch(
      addExpenseToBudget(
        props.groupId,
        props.budgetId,
        expenseName,
        price,
        description
      )
    );
  };

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
      <MainButton isOutline={true} text="Save" onClick={handleSave} />
    </div>
  );
};

export default AddExpenseModal;
