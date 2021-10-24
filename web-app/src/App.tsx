import { useEffect } from "react";

import classes from "./App.module.scss";

import AuthorizationLayout from "./pages/Authorization";

import LoginPage from "./pages/Authorization/Login";
import RegisterPage from "./pages/Authorization/Register";
import AdditionalDataPage from "./pages/Authorization/AdditionalData";
import AddPhotoPage from "./pages/Authorization/AddPhoto";
import ChooseRolePage from "./pages/Authorization/ChooseRole";
import ParentCodePage from "./pages/Authorization/ParentCode";
import WelcomePage from "./pages/Authorization/Welcome";

import { setUpCloudinary } from "./utils/cloudinary";

const App = () => {
  useEffect(() => {
    setUpCloudinary();
  }, []);

  return (
    <div className={classes.container}>
      <WelcomePage />
    </div>
  );
};

export default App;
