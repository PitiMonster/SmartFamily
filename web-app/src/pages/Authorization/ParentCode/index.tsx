import React, { useState, useEffect } from "react";
import validator from "validator";

import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import AuthLayout from "../../../layout/AuthLayout";
import TextInput from "../../../components/inputs/TextInput";
import TextButtonInput from "../../../components/inputs/TextButtonInput";
import MainButton from "../../../components/buttons/MainButton";
import CreateIcon from "@mui/icons-material/Create";

import { useHistory } from "react-router-dom";
import { History } from "history";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { sendParentCode, verifyParentCode } from "../../../store/auth/actions";
import { setStatus } from "../../../store/utils/actions";

const ParentCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);
  const history = useHistory<History>();

  const [parentEmail, setParentEmail] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");

  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isCodeError, setIsCodeError] = useState<boolean>(false);

  const [isParentIdCorrect, setIsParentIdCorrect] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<"sendCode" | "verifyCode">(
    "sendCode"
  );

  useEffect(() => {
    if (status === "success") {
      if (!isParentIdCorrect && currentAction === "sendCode") {
        toastSuccess("Code send to parent email address successfully");
        setIsParentIdCorrect(true);
        dispatch(setStatus(null));
      } else if (isParentIdCorrect && currentAction === "verifyCode") {
        toastSuccess("You have successfully created account!\nSign in now!");
        history.replace("/auth/signin");
      }
    }
  }, [status, dispatch]);

  const handleSendCode = () => {
    setIsEmailError(false);
    setIsParentIdCorrect(false);
    if (!validator.isEmail(parentEmail)) {
      toastError("Please enter a valid email address");
      setIsEmailError(true);
      return;
    }

    setCurrentAction("sendCode");
    dispatch(
      sendParentCode(
        parentEmail,
        `${localStorage.getItem("name")} ${localStorage.getItem("surname")}`
      )
    );
  };

  const handleCheckCode = () => {
    setIsCodeError(false);
    if (emailCode.length !== 6) {
      toastError("Invalid email code format");
      setIsCodeError(true);
      return;
    }

    setCurrentAction("verifyCode");

    const childId = localStorage.getItem("childId");

    dispatch(verifyParentCode(emailCode, parentEmail, childId as string));
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
          error={isCodeError}
        >
          <TextInput
            text={emailCode}
            setText={setEmailCode}
            label="Code from parent's email address"
            icon={<CreateIcon />}
          />
        </FormControl>
      </div>
      <MainButton isOutline={false} text="Save" onClick={handleCheckCode} />
    </AuthLayout>
  );
};

export default ParentCode;
