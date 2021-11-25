import { useEffect, useState } from "react";

import classes from "./index.module.scss";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import { useHistory } from "react-router-dom";
import { History } from "history";
import { useParams } from "react-router-dom";

import { HtmlElements } from "../../../types";

import BudgetsListItem from "./components/BudgetsListItem";
import ContentLayout from "../../../layout/ContentLayout";
import AddBudgetModal from "../components/AddModifyBudget";
import { getFamilyBudgets } from "../../../store/budget/actions";

const BudgetsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const budgetsData = useAppSelector((state) => state.budget.budgetsList);

  const history = useHistory<History>();
  const { groupId } = useParams<{ groupId: string }>();

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
    dispatch(getFamilyBudgets(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    const newBudgets = budgetsData.map((budget) => (
      <BudgetsListItem {...budget} />
    ));

    setBudgets(newBudgets);
  }, [budgetsData]);

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
      {isAddModifyBudgetModal && <AddBudgetModal groupId={groupId} />}
    </ContentLayout>
  );
};

export default BudgetsList;
