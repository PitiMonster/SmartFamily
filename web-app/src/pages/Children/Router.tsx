import { Switch, Route, BrowserRouter } from "react-router-dom";
import ChildrenListPage from "./ChildrenListPage";
import SpecificChildPage from "./SpecificChildPage";

import TasksRouter from "../Tasks/Router";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/children">
      <Switch>
        <Route path="/" exact={true}>
          <ChildrenListPage />
        </Route>
        <Route path="/:id" exact={true}>
          <SpecificChildPage />
        </Route>
        <Route path="/:id/tasks">
          <TasksRouter />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
