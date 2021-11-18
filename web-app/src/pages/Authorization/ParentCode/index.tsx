import React, { useState, useEffect } from "react";
import validator from "validator";

import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import AuthLayout from "../../../layout/AuthLayout";
import TextInput from "../../../components/inputs/TextInput";
import TextButtonInput from "../../../components/inputs/TextButtonInput";
import MainButton from "../../../components/buttons/MainButton";
import CreateIcon from "@mui/icons-material/Create";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { sendParentCode, setStatus } from "../../../store/auth/actions";

const ParentCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  const [parentEmail, setParentEmail] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");

  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const [isParentIdCorrect, setIsParentIdCorrect] = useState<boolean>(false);

  useEffect(() => {
    console.log(status);
    if (status === "fail") {
      if (!isParentIdCorrect) {
        toastError("Provided parent's username is not correct");
      } else {
        toastError("Provided code is not correct");
      }
    } else if (status === "success") {
      if (!isParentIdCorrect) {
        toastSuccess("Code send to parent email address successfully");
        setIsParentIdCorrect(true);
        dispatch(setStatus(null));
      } else {
        toastSuccess("You have signed up successfully");
        // signup
      }
    }
  }, [status, dispatch]);

  const handleSendCode = () => {
    setIsEmailError(false);
    if (!validator.isEmail(parentEmail)) {
      toastError("Please enter a valid email address");
      setIsEmailError(true);
      return;
    }
    dispatch(
      sendParentCode(
        parentEmail,
        `${localStorage.getItem("name")} +${localStorage.getItem("surname")}`
      )
    );
  };

  return (
    <AuthLayout>
      <p className={classes.title}>Add your parent</p>
      <div className={classes.inputs}>
        <FormControl
          className={classes.input}
          variant="standard"
          color="primary"
          error={isEmailError}
        >
          <TextButtonInput
            text={parentEmail}
            setText={setParentEmail}
            label="Parent's email address"
            buttonText="Send code"
            buttonAction={handleSendCode}
          />
        </FormControl>
        <FormControl
          className={classes.input}
          variant="standard"
          color="primary"
        >
          <TextInput
            text={emailCode}
            setText={setEmailCode}
            label="Code from parent's email address"
            icon={<CreateIcon />}
          />
        </FormControl>
      </div>
      <MainButton isOutline={false} text="Save" onClick={() => {}} />
    </AuthLayout>
  );
};

export default ParentCode;
