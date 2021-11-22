import { useEffect, useState } from "react";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useAppDispatch } from "../../../../../hooks";
import { updateBackdrop } from "../../../../../store/utils/actions";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";

const AddExpenseModal: React.FC<{
  title: string;
  name?: string;
  price?: number;
  description?: string;
}> = ({ title, name, price, description }) => {
  const dispatch = useAppDispatch();
  const [itemName, setItemName] = useState<string>("");
  const [expensePrice, setExpensePrice] = useState<string>("");
  const [expenseDescription, setExpenseDescription] = useState<string>("");

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (name && price && description) {
      setItemName(name);
      setExpensePrice(price.toString());
      setExpenseDescription(description);
    }
  }, [name, price, description]);

  return (
    <div className={classes.modal}>
      <p className={classes.title}>{title}</p>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={itemName} setText={setItemName} label="Item name" />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={expensePrice}
          setText={setExpensePrice}
          label="Price"
        />
      </FormControl>

      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        maxRows={10}
        placeholder="Item description"
        value={expenseDescription}
        onChange={(event) => setExpenseDescription(event.target.value)}
      />
      <MainButton isOutline={true} text="Save" onClick={() => {}} />
    </div>
  );
};

export default AddExpenseModal;
