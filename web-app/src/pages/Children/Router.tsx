import { Switch, Route, BrowserRouter } from "react-router-dom";
import ChildrenListPage from "./ChildrenListPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/children">
      <Switch>
        <Route path="/" exact={true}>
          <ChildrenListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
