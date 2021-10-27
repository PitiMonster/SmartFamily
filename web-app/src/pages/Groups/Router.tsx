import { Switch, Route, BrowserRouter } from "react-router-dom";

import GroupsListPage from "./GroupsList";
import CreateGroupPage from "./CreateGroup";
import SpecificGroupPage from "./SpecificGroup";

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
        <Route path="/:groupId" exact={true}>
          <SpecificGroupPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
