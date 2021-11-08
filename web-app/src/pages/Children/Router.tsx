import { Switch, Route, BrowserRouter } from "react-router-dom";
import ChildrenListPage from "./ChildrenListPage";
import SpecificChildPage from "./SpecificChildPage";

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
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
