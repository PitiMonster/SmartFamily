import { Switch, Route, BrowserRouter } from "react-router-dom";

import BudgetsListPage from "./BudgetsList";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/budgets">
      <Switch>
        <Route path="/" exact={true}>
          <BudgetsListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
