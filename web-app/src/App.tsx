import { useEffect, useState } from "react";

import classes from "./App.module.scss";

import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./themes";

import { useAppSelector, useAppDispatch } from "./hooks";
import { setAppError } from "./store/utils/actions";

import { setUpCloudinary } from "./utils/cloudinary";
import AuthRouter from "./pages/Authorization/Router";
import GroupsRouter from "./pages/Groups/Router";
import ChatRouter from "./pages/Chat/Router";

import Backdrop from "./components/ux/Backdrop";
import { toastError } from "./utils/toasts";

import {
  runSocket,
  setDispatch,
  runAppListeners,
  runAppEmitters,
} from "./utils/websockets";
import { getCurrentUser } from "./store/user/actions";
import { getNotifications } from "./store/notifications/actions";
import { getInvitations } from "./store/invitations/actions";

const App = () => {
  const dispatch = useAppDispatch();
  const isBackdrop = useAppSelector((store) => store.utils.isBackdrop);
  const appError = useAppSelector((store) => store.utils.error);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    setUpCloudinary();
  }, []);

  useEffect(() => {
    console.log("siema uruchomiony");
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      runSocket();
      setDispatch(dispatch);
      runAppListeners();
      runAppEmitters(userId);
    }
  }, [dispatch]);

  useEffect(() => {
    const isToken = !!localStorage.getItem("token");
    setIsUserLoggedIn(isToken);
    if (isToken) {
      dispatch(getCurrentUser());
      dispatch(getNotifications);
      dispatch(getInvitations);
    }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (appError) {
      toastError(appError, () => {
        dispatch(setAppError(""));
      });
    }
  }, [appError, dispatch]);

  return (
    <div className={classes.container}>
      <ThemeProvider theme={mainTheme}>
        <Switch>
          <Route path="/" exact={true}>
            {isUserLoggedIn ? (
              <Redirect to={{ pathname: "/groups" }} />
            ) : (
              <Redirect to={{ pathname: "/auth" }} />
            )}
          </Route>
          <Route path="/auth">
            {!isUserLoggedIn ? <AuthRouter /> : <Redirect to="/groups" />}
          </Route>
          {isUserLoggedIn && (
            <>
              <Route path="/groups">
                <GroupsRouter />
              </Route>

              <Route path="/chats">
                <ChatRouter />
              </Route>
            </>
          )}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </ThemeProvider>
      {isBackdrop && <Backdrop />}
    </div>
  );
};

export default App;
