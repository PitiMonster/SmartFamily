import { useEffect } from "react";

import AuthorizationLayout from "./pages/Authorization";

import LoginPage from "./pages/Authorization/Login";
import RegisterPage from "./pages/Authorization/Register";
import AdditionalDataPage from "./pages/Authorization/AdditionalData";
import AddPhotoPage from "./pages/Authorization/AddPhoto";
import ChooseRolePage from "./pages/Authorization/ChooseRole";

import { setUpCloudinary } from "./utils/cloudinary";

const App = () => {
  useEffect(() => {
    setUpCloudinary();
  }, []);

  return (
    <div>
      <ChooseRolePage />
    </div>
  );
};

export default App;
