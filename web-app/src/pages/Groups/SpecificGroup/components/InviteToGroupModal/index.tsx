import { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { setStatus, updateBackdrop } from "../../../../../store/utils/actions";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";

import { toastError, toastSuccess } from "../../../../../utils/toasts";
import { createGroupInvitation } from "../../../../../store/invitations/actions";

const InviteToGroupModal: React.FC<{ groupId: string }> = ({ groupId }) => {
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector((store) => store.utils.status);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (requestStatus === "success") {
      toastSuccess("User invited successfully");
      dispatch(updateBackdrop(false));
      dispatch(setStatus(null));
    }
  }, [requestStatus, dispatch]);

  const handleSave = () => {
    if (!username) {
      toastError("Please enter username");
      return;
    }

    dispatch(createGroupInvitation(groupId, username));
  };

  return (
    <div className={classes.modal}>
      <p className={classes.title}>Enter the username you want to invite</p>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput text={username} setText={setUsername} label="Username" />
      </FormControl>
      <MainButton isOutline={true} text="Save" onClick={handleSave} />
    </div>
  );
};

export default InviteToGroupModal;
