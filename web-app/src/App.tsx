import { useEffect } from "react";

import classes from "./App.module.scss";

import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./themes";

import { setUpCloudinary } from "./utils/cloudinary";
import AuthRouter from "./pages/Authorization/Router";
import GroupsRouter from "./pages/Groups/Router";
import CalendarRouter from "./pages/Calendar/Router";

const App = () => {
  useEffect(() => {
    setUpCloudinary();
  }, []);

  return (
    <div className={classes.container}>
      <ThemeProvider theme={mainTheme}>
        <Switch>
          <Route path="/auth">
            <AuthRouter />
          </Route>
          <Route path="/groups">
            <GroupsRouter />
          </Route>
          <Route path="/calendar">
            <CalendarRouter />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
