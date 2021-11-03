import { useEffect, useState } from "react";

import classes from "./index.module.scss";

import { HtmlElements } from "../../../types";

import BudgetsListItem from "./components/BudgetsListItem";
import ContentLayout from "../../../layout/ContentLayout";

const BudgetsList: React.FC = () => {
  const [budgets, setBudgets] = useState<HtmlElements>([]);

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
        <p className={classes.title}>Budżety</p>
        <div className={classes.budgets}>{budgets}</div>
      </div>
    </ContentLayout>
  );
};

export default BudgetsList;
