import { useEffect } from "react";

import classes from "./App.module.scss";

import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./themes";

import { useAppSelector } from "./hooks";

import { setUpCloudinary } from "./utils/cloudinary";
import AuthRouter from "./pages/Authorization/Router";
import GroupsRouter from "./pages/Groups/Router";
import CalendarRouter from "./pages/Calendar/Router";
import BudgetsRouter from "./pages/Budget/Router";
import ShoppingListRouter from "./pages/ShoppingList/Router";

import Backdrop from "./components/ux/Backdrop";

const App = () => {
  const isBackdrop = useAppSelector((store) => store.utils.isBackdrop);

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
          <Route path="/budgets">
            <BudgetsRouter />
          </Route>
          <Route path="/shopping">
            <ShoppingListRouter />
          </Route>
        </Switch>
      </ThemeProvider>
      {isBackdrop && <Backdrop />}
    </div>
  );
};

export default App;
