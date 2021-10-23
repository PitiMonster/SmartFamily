import { useEffect } from "react";

import AuthorizationLayout from "./pages/Authorization";

import LoginPage from "./pages/Authorization/Login";
import RegisterPage from "./pages/Authorization/Register";
import AdditionalDataPage from "./pages/Authorization/AdditionalData";
import AddPhotoPage from "./pages/Authorization/AddPhoto";

import { setUpCloudinary } from "./utils/cloudinary";

const App = () => {
  useEffect(() => {
    setUpCloudinary();
  }, []);

  return (
    <div>
      <AddPhotoPage />
    </div>
  );
};

export default App;
