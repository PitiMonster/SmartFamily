import { Switch, Route, BrowserRouter } from "react-router-dom";

import ListPage from "./ListPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/shopping">
      <Switch>
        <Route path="/" exact={true}>
          <ListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
