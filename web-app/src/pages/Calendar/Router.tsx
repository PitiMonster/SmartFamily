import { Switch, Route } from "react-router-dom";

import CalendarPage from "./CalendarPage";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/groups/:groupId/calendar/" exact={true}>
        <CalendarPage />
      </Route>
    </Switch>
  );
};

export default Router;
