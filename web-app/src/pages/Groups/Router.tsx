import { Switch, Route, BrowserRouter } from "react-router-dom";

import GroupsListPage from "./GroupsList";
import CreateGroupPage from "./CreateGroup";
import SpecificGroupPage from "./SpecificGroup";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/groups" exact={true}>
        <GroupsListPage />
      </Route>
      <Route path={`/groups/create-new`} exact={true}>
        <CreateGroupPage />
      </Route>
      <Route path="/groups/:groupId" exact={true}>
        <SpecificGroupPage />
      </Route>
    </Switch>
  );
};

export default Router;
