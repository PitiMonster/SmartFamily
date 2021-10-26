import { useEffect } from "react";

import classes from "./App.module.scss";

import { Switch, Route } from "react-router-dom";

import { setUpCloudinary } from "./utils/cloudinary";
import AuthRouter from "./pages/Authorization/Router";
import GroupsRouter from "./pages/Groups/Router";

const App = () => {
  useEffect(() => {
    setUpCloudinary();
  }, []);

  return (
    <div className={classes.container}>
      <Switch>
        <Route path="/auth">
          <AuthRouter />
        </Route>
        <Route path="/groups">
          <GroupsRouter />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
