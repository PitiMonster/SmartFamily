import { useState, useEffect } from "react";

import classes from "./index.module.scss";

import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";

import { Expense, HtmlElements } from "../../../types";

import { useAppSelector, useAppDispatch } from "../../../hooks";
import { useParams } from "react-router-dom";

import ContentLayout from "../../../layout/ContentLayout";
import ListItem from "../../../components/ListItem";
import ModifyBudgetModal from "../components/AddModifyBudget";
import AddExpenseModal from "./components/AddExpenseModal";
import { getOneBudget } from "../../../store/budget/actions";

const SpecificBudgetPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedBudget = useAppSelector((state) => state.budget.selectedBudget);
  const { id, groupId } = useParams<{ groupId: string; id: string }>();

  const [progress, setProgress] = useState<number>(0);
  const [budgetName, setBudgetName] = useState<string>("");
  const [maxValue, setMaxValue] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [expenses, setExpenses] = useState<HtmlElements>([]);

  const [isAddModifyBudgetModal, setIsAddModifyBudgetModal] =
    useState<boolean>(false);
  const [isAddExpenseModal, setIsAddExpenseModal] = useState<boolean>(false);

  // TODO przekzać wszystkie dane do modala modyfikacji budżetu
  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddModifyBudgetModal(false);
      setIsAddExpenseModal(false);
    }
  }, [isBackdrop]);

  useEffect(() => {
    if (id) {
      dispatch(getOneBudget(groupId, id));
    }
  }, [groupId, id, dispatch]);

  useEffect(() => {
    if (selectedBudget) {
      setMaxValue(+selectedBudget.budgetValue);
      console.log(selectedBudget.currentExpensesValue);
      setCurrentValue(+selectedBudget.currentExpensesValue);
      setBudgetName(selectedBudget.name);
    }
  }, [selectedBudget]);

  useEffect(() => {
    if (selectedBudget) {
      const newExpenses = (selectedBudget.expenses as Expense[])?.map(
        (expense) => (
          <ListItem
            primaryText={expense.name}
            trailingText={expense.value.toString()}
          />
        )
      );
      setExpenses(newExpenses);
    }
  }, [selectedBudget]);

  useEffect(() => {
    if (maxValue) {
      const temp = (currentValue / maxValue) * 100;
      if (progress < temp) {
        let newProgress = parseFloat(
          (
            progress +
            (1 / Math.pow(10, Math.round(Math.log10(temp)))) * temp
          ).toFixed(2)
        );
        newProgress = newProgress > temp ? temp : newProgress;
        setTimeout(() => {
          return setProgress(newProgress);
        }, 1);
      }
    }
  }, [currentValue, maxValue, progress]);

  const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
  ) => (
    <Box
      className={classes.progress}
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        className={classes.progress__circle}
        variant="determinate"
        sx={{
          position: "absolute",
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        thickness={1}
        {...props}
        value={100}
      />
      <CircularProgress
        className={classes.progress__circle}
        thickness={1}
        variant="determinate"
        {...props}
        color={props.value > 100 ? "error" : "secondary"}
        value={props.value > 100 ? 100 : props.value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color={progress > 100 ? "error" : "secondary"}
          className={classes.progress__textValue}
        >{`${((props.value * maxValue) / 100).toFixed(2)}zł`}</Typography>
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          className={classes.progress__textProcent}
        >{`${props.value.toFixed(2)}%`}</Typography>
      </Box>
    </Box>
  );

  return (
    <ContentLayout>
      <div className={classes.nameContainer}>
        <p className={classes.budgetName}>Budget name</p>
        <IconButton
          color="info"
          onClick={() => {
            setIsAddModifyBudgetModal(true);
          }}
        >
          <CreateIcon fontSize="large" />
        </IconButton>
      </div>
      <div className={classes.container}>
        <CircularProgressWithLabel value={progress} />
        <div className={classes.expenses}>
          <div className={classes.header}>
            <p className={classes.expenses__title}>Wydatki</p>
            <IconButton
              color="primary"
              onClick={() => {
                setIsAddExpenseModal(true);
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={classes.expenses__list}>{expenses}</div>
        </div>
      </div>
      {isAddModifyBudgetModal && (
        <ModifyBudgetModal groupId={groupId} selectedBudget={selectedBudget} />
      )}
      {isAddExpenseModal && <AddExpenseModal groupId={groupId} budgetId={id} />}
    </ContentLayout>
  );
};

export default SpecificBudgetPage;
