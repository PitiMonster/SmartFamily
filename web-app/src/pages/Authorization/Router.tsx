import { Switch, Route, BrowserRouter } from "react-router-dom";

import WelcomePage from "./Welcome";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import AdditionalDataPage from "./AdditionalData";
import AddPhotoPage from "./AddPhoto";
import ParentCode from "./ParentCode";
import ChooseRolePage from "./ChooseRole";
import ForgotPasswordPage from "./ForgotPassword";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/auth" exact={true}>
        <WelcomePage />
      </Route>
      <Route path={`/auth/signin`} exact={true}>
        <LoginPage />
      </Route>
      <Route path="/auth/forgot-password">
        <ForgotPasswordPage />
      </Route>
      <Route path="/auth/signup" exact={true}>
        <RegisterPage />
      </Route>
      <Route path="/auth/signup/fill-data">
        <AdditionalDataPage />
      </Route>
      <Route path="/auth/signup/choose-photo">
        <AddPhotoPage />
      </Route>
      <Route path="/auth/signup/choose-role">
        <ChooseRolePage />
      </Route>
      <Route path="/auth/signup/parent-code">
        <ParentCode />
      </Route>
    </Switch>
  );
};

export default Router;
