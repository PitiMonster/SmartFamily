import { Switch, Route, BrowserRouter } from "react-router-dom";

import BudgetsListPage from "./BudgetsList";
import SpecificBudgetPage from "./SepcificBudget";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/groups/:groupId/budgets/" exact={true}>
        <BudgetsListPage />
      </Route>
      <Route path="/groups/:groupId/budgets/:id" exact={true}>
        <SpecificBudgetPage />
      </Route>
    </Switch>
  );
};

export default Router;
