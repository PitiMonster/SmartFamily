import { useEffect, useState } from "react";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { setStatus, updateBackdrop } from "../../../../../store/utils/actions";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";

import { ShoppingItem as ShoppingItemType } from "../../../../../types";
import {
  addShoppingItem,
  patchShoppingItem,
} from "../../../../../store/shopping/actions";
import { toastError, toastSuccess } from "../../../../../utils/toasts";

interface SelectedItemType extends ShoppingItemType {
  title: string;
  groupId: string;
}

const AddExpenseModal: React.FC<SelectedItemType | null> = ({
  title,
  _id,
  name,
  count,
  description = "",
  groupId,
}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);

  const [itemName, setItemName] = useState<string>("");
  const [itemCount, setItemCount] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");

  const [currentAction, setCurrentAction] = useState<"create" | "update" | "">(
    ""
  );

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (name && count) {
      setItemName(name);
      setItemCount(count.toString());
      setItemDescription(description as string);
    }
  }, [name, count, description]);

  useEffect(() => {
    if (status === "success") {
      if (currentAction === "create") {
        toastSuccess("Item added successfully");
      } else if (currentAction === "update") {
        toastSuccess("Item updated successfully");
      }
      dispatch(setStatus(null));
      dispatch(updateBackdrop(false));
      setCurrentAction("");
    }
  }, [status, dispatch, currentAction]);

  const handleSave = () => {
    if (!itemName || !itemCount) {
      toastError("Item name and count are required");
      return;
    }
    if (name && count) {
      dispatch(
        patchShoppingItem(groupId, _id, itemName, itemCount, itemDescription)
      );
      setCurrentAction("update");
    } else {
      dispatch(addShoppingItem(groupId, itemName, itemCount, itemDescription));
      setCurrentAction("create");
    }
  };

  return (
    <div className={classes.modal}>
      <p className={classes.title}>{title}</p>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={itemName} setText={setItemName} label="Item name" />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={itemCount} setText={setItemCount} label="Price" />
      </FormControl>

      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        maxRows={10}
        placeholder="Item description"
        value={itemDescription}
        onChange={(event) => setItemDescription(event.target.value)}
      />
      <MainButton isOutline={true} text="Save" onClick={handleSave} />
    </div>
  );
};

export default AddExpenseModal;
