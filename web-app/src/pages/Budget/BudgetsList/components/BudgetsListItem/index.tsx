import classes from "./index.module.scss";

const BudgetsListItem: React.FC<{ leftValue: Number; budgetName: string }> = ({
  leftValue,
  budgetName,
}) => {
  return (
    <div className={classes.container}>
      <p className={classes.budgetLeftValue}>{leftValue}zł</p>
      <p className={classes.budgetName}>{budgetName}</p>
    </div>
  );
};

export default BudgetsListItem;
