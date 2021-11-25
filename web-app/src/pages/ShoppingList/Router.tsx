import { Switch, Route } from "react-router-dom";

import ListPage from "./ListPage";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/groups/:groupId/shopping/" exact={true}>
        <ListPage />
      </Route>
    </Switch>
  );
};

export default Router;
