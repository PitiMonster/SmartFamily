import { Switch, Route, BrowserRouter } from "react-router-dom";

import RewardsListPage from "./RewardsListPage";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="" exact={true}>
        <RewardsListPage />
      </Route>
    </Switch>
  );
};

export default Router;
