import { useEffect } from "react";

import { toast } from "react-toastify";

import classes from "./App.module.scss";

import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./themes";

import { useAppSelector, useAppDispatch } from "./hooks";
import { setAppError } from "./store/utils/action";

import { setUpCloudinary } from "./utils/cloudinary";
import AuthRouter from "./pages/Authorization/Router";
import GroupsRouter from "./pages/Groups/Router";
import CalendarRouter from "./pages/Calendar/Router";
import BudgetsRouter from "./pages/Budget/Router";
import ShoppingListRouter from "./pages/ShoppingList/Router";
import ChildrenRouter from "./pages/Children/Router";
import TasksRouter from "./pages/Children/Router";
import ChatRouter from "./pages/Chat/Router";

import Backdrop from "./components/ux/Backdrop";

const App = () => {
  const dispatch = useAppDispatch();
  const isBackdrop = useAppSelector((store) => store.utils.isBackdrop);
  const appError = useAppSelector((store) => store.utils.error);

  useEffect(() => {
    setUpCloudinary();
  }, []);

  useEffect(() => {
    if (appError) {
      toast.error(appError, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => {
          dispatch(setAppError(""));
        },
      });
    }
  }, [appError, dispatch]);

  return (
    <div className={classes.container}>
      <ThemeProvider theme={mainTheme}>
        <Switch>
          <Route path="/" exact={true}>
            <Redirect to={{ pathname: "/auth" }} />
          </Route>
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
          <Route path="/children">
            <ChildrenRouter />
          </Route>
          <Route path="/children/:id/tasks">
            <TasksRouter />
          </Route>
          <Route path="/chats">
            <ChatRouter />
          </Route>
        </Switch>
      </ThemeProvider>
      {isBackdrop && <Backdrop />}
    </div>
  );
};

export default App;
