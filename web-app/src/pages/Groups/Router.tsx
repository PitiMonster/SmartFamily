import { Switch, Route, BrowserRouter } from "react-router-dom";

import GroupsListPage from "./GroupsList";
import CreateGroupPage from "./CreateGroup";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/groups">
      <Switch>
        <Route path="/" exact={true}>
          <GroupsListPage />
        </Route>
        <Route path={`/create-new`} exact={true}>
          <CreateGroupPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
