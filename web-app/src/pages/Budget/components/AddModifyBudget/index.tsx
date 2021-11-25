import { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Collapse from "@mui/material/Collapse";
import { Stack } from "@mui/material";

import classes from "./index.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../hooks";

import { setStatus, updateBackdrop } from "../../../../store/utils/actions";

import TextInput from "../../../../components/inputs/TextInput";
import MainButton from "../../../../components/buttons/MainButton";
import { addBudget, updateBudget } from "../../../../store/budget/actions";
import moment from "moment";
import { toastError, toastSuccess } from "../../../../utils/toasts";
import { Budget } from "../../../../types";

const AddModifyBudget: React.FC<{
  groupId: string;
  selectedBudget?: Budget | null;
}> = ({ groupId, selectedBudget }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);

  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetValue, setBudgetValue] = useState<string>("");
  const [renewPeriodically, setRenewPeriodically] = useState<boolean>(false);
  const [renewUnitCount, setRenewUnitCount] = useState<string>("");
  const [renewUnit, setRenewUnit] = useState<"days" | "months" | "years">(
    "days"
  );
  const [nextRenewal, setNextRenewal] = useState<Date | null>();
  const [currentAction, setCurrentAction] = useState<"create" | "update" | "">(
    ""
  );

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBudget) {
      setBudgetName(selectedBudget.name);
      setBudgetValue(selectedBudget.budgetValue.toString());
      setRenewPeriodically(!!selectedBudget.renewalDate);
      if (selectedBudget.renewalDate) {
        setNextRenewal(moment(selectedBudget.renewalDate).toDate());
      }
    }
  }, [selectedBudget]);

  useEffect(() => {
    if (renewUnit && renewUnitCount) {
      setNextRenewal(
        moment()
          .add(+renewUnitCount, renewUnit)
          .toDate()
      );
    }
  }, [renewUnit, renewUnitCount]);

  useEffect(() => {
    if (currentAction === "") return;
    switch (currentAction) {
      case "create":
        toastSuccess("Bduget created successfully");
        break;
      case "update":
        toastSuccess("Budget updated successfully");
        break;
      default:
        break;
    }
    setCurrentAction("");
    dispatch(setStatus(null));
    dispatch(updateBackdrop(false));
  }, [status, dispatch, currentAction]);

  const handleRenewUnitChange = (event: SelectChangeEvent) => {
    setRenewUnit(event.target.value as "days" | "months" | "years");
  };

  const handleSave = () => {
    if (!budgetName || !budgetValue) {
      toastError("Budget name and value are required!");
      return;
    }

    if (+budgetValue <= 0) {
      toastError("Budget value must be positive!");
      return;
    }

    if (selectedBudget) {
      dispatch(
        updateBudget(
          groupId,
          selectedBudget._id,
          budgetName,
          budgetValue,
          nextRenewal as Date,
          renewUnit,
          renewUnitCount
        )
      );
      setCurrentAction("update");
    } else {
      dispatch(
        addBudget(
          groupId,
          budgetName,
          budgetValue,
          nextRenewal as Date,
          renewUnit,
          renewUnitCount
        )
      );
      setCurrentAction("create");
    }
  };

  return (
    <div className={classes.modal}>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={budgetName}
          setText={setBudgetName}
          label="Budget name"
        />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={budgetValue}
          setText={setBudgetValue}
          label="Budget value"
        />
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={renewPeriodically}
            onChange={(event) => setRenewPeriodically(event.target.checked)}
          />
        }
        label="Renew periodically"
      />
      <Collapse in={renewPeriodically}>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            className={classes.period}
            spacing={4}
          >
            <FormControl
              variant="standard"
              color="primary"
              className={classes.period__input}
            >
              <TextInput
                text={renewUnitCount}
                setText={setRenewUnitCount}
                label="Amount"
              />
            </FormControl>
            <FormControl className={classes.period__input}>
              <InputLabel id="demo-simple-select-label">Period</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={renewUnit}
                label="Period"
                onChange={handleRenewUnitChange}
              >
                <MenuItem value={"days"}>Days</MenuItem>
                <MenuItem value={"months"}>Months</MenuItem>
                <MenuItem value={"years"}>Years</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <FormControl
            variant="standard"
            color="primary"
            className={classes.input}
          >
            <TextInput
              text={moment(nextRenewal).format("YYYY/MM/DD")}
              label="Next renewal date"
              disabled={true}
            />
          </FormControl>
        </Stack>
      </Collapse>
      <MainButton isOutline={true} text="Save" onClick={handleSave} />
    </div>
  );
};

export default AddModifyBudget;
