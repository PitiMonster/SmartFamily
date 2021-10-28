import { Switch, Route, BrowserRouter } from "react-router-dom";

import CalendarPage from "./CalendarPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/calendar">
      <Switch>
        <Route path="/" exact={true}>
          <CalendarPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
