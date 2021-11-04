import { Switch, Route, BrowserRouter } from "react-router-dom";

import BudgetsListPage from "./BudgetsList";
import SpecificBudgetPage from "./SepcificBudget";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/budgets">
      <Switch>
        <Route path="/" exact={true}>
          <BudgetsListPage />
        </Route>
        <Route path="/:id" exact={true}>
          <SpecificBudgetPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
