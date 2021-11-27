import { Switch, Route, BrowserRouter } from "react-router-dom";

import TasksListPage from "./TasksListPage";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="" exact={true}>
        <TasksListPage />
      </Route>
    </Switch>
  );
};

export default Router;
