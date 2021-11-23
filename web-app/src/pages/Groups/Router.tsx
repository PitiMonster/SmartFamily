import { Switch, Route, BrowserRouter } from "react-router-dom";

import GroupsListPage from "./GroupsList";
import CreateGroupPage from "./CreateGroup";
import SpecificGroupPage from "./SpecificGroup";

import CalendarRouter from "../Calendar/Router";
import BudgetsRouter from "../Budget/Router";
import ShoppingListRouter from "../ShoppingList/Router";
import ChildrenRouter from "../Children/Router";
import TasksRouter from "../Children/Router";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/groups" exact={true}>
        <GroupsListPage />
      </Route>
      <Route path={`/groups/create-new`} exact={true}>
        <CreateGroupPage />
      </Route>
      <Route path="/groups/:groupId/" exact={true}>
        <SpecificGroupPage />
      </Route>
      <Route path="/groups/:groupId/calendar">
        <CalendarRouter />
      </Route>
      <Route path="/groups/:groupId/budgets">
        <BudgetsRouter />
      </Route>
      <Route path="/groups/:groupId/shopping">
        <ShoppingListRouter />
      </Route>
      <Route path="/groups/:groupId/children">
        <ChildrenRouter />
      </Route>
      <Route path="/groups/:groupId/children/:id/tasks">
        <TasksRouter />
      </Route>
    </Switch>
  );
};

export default Router;
