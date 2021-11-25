import classes from "./index.module.scss";

import { useHistory } from "react-router-dom";
import { History } from "history";

import { Budget as BudgetType } from "../../../../../types";

const BudgetsListItem: React.FC<BudgetType> = (BudgetData) => {
  const history = useHistory<History>();

  return (
    <div
      className={classes.container}
      onClick={() => {
        history.push(BudgetData._id);
      }}
    >
      <p className={classes.budgetLeftValue}>
        {+BudgetData.budgetValue - +BudgetData.currentExpensesValue}zł
      </p>
      <p className={classes.budgetName}>{BudgetData.name}</p>
    </div>
  );
};

export default BudgetsListItem;
