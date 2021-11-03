import { useState, useEffect } from "react";

import classes from "./index.module.scss";

const BudgetsListItem: React.FC<{
  leftValue: number;
  budgetName: string;
  onClick?: () => {};
}> = ({ leftValue, budgetName, onClick }) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (value !== leftValue) {
      const newValue = value + (1 / 100) * leftValue;
      setTimeout(() => {
        return setValue(newValue);
      }, 5);
    }
  }, [value, leftValue]);

  return (
    <div className={classes.container} onClick={onClick}>
      <p className={classes.budgetLeftValue}>{value}zł</p>
      <p className={classes.budgetName}>{budgetName}</p>
    </div>
  );
};

export default BudgetsListItem;
