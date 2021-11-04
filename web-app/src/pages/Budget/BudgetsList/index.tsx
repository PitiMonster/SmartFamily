import { useEffect, useState } from "react";

import classes from "./index.module.scss";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { HtmlElements } from "../../../types";

import BudgetsListItem from "./components/BudgetsListItem";
import ContentLayout from "../../../layout/ContentLayout";
import AddBudgetModal from "../components/AddModifyBudget";

import { useAppSelector } from "../../../hooks";

const BudgetsList: React.FC = () => {
  const [budgets, setBudgets] = useState<HtmlElements>([]);
  const [isAddModifyBudgetModal, setIsAddModifyBudgetModal] =
    useState<boolean>(false);

  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddModifyBudgetModal(false);
    }
  }, [isBackdrop]);

  useEffect(() => {
    const data = [
      {
        budgetName: "Budget name",
        leftValue: 100,
      },
      {
        budgetName: "Budget name",
        leftValue: 50,
      },
      {
        budgetName: "Budget name",
        leftValue: 1000,
      },
      {
        budgetName: "Budget name",
        leftValue: 90000,
      },
      {
        budgetName: "Budget name",
        leftValue: 500,
      },
      {
        budgetName: "Budget name",
        leftValue: 5500,
      },
    ];
    const newBudgets = data.map((budget) => <BudgetsListItem {...budget} />);

    setBudgets(newBudgets);
  }, []);

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.header}>
          <p className={classes.title}>Budgets</p>
          <IconButton
            color="primary"
            onClick={() => {
              setIsAddModifyBudgetModal(true);
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={classes.budgets}>{budgets}</div>
      </div>
      {isAddModifyBudgetModal && <AddBudgetModal />}
    </ContentLayout>
  );
};

export default BudgetsList;
