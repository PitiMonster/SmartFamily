import { Switch, Route, BrowserRouter } from "react-router-dom";

import WelcomePage from "./Welcome";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import AdditionalDataPage from "./AdditionalData";
import AddPhotoPage from "./AddPhoto";
import ParentCode from "./ParentCode";
import ChooseRolePage from "./ChooseRole";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename="/auth">
      <Switch>
        <Route path="/" exact={true}>
          <WelcomePage />
        </Route>
        <Route path={`/signin`} exact={true}>
          <LoginPage />
        </Route>
        <Route path="/signup" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/signup/fill-data">
          <AdditionalDataPage />
        </Route>
        <Route path="/signup/choose-photo">
          <AddPhotoPage />
        </Route>
        <Route path="/signup/choose-role">
          <ChooseRolePage />
        </Route>
        <Route path="/signup/parent-code">
          <ParentCode />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
