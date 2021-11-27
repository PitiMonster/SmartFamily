import { useEffect, useState } from "react";

import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import ChildrenListPage from "./ChildrenListPage";
import SpecificChildPage from "./SpecificChildPage";

import TasksRouter from "../Tasks/Router";
import RewardsRouter from "../Rewards/Router";

import { useAppSelector } from "../../hooks";

import { User as UserType } from "../../types";

const Router: React.FC = () => {
  const currentUser = useAppSelector((state) => state.user.loggedInUser);

  const [user, setUser] = useState<UserType | undefined>();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  if (!user) return <></>;

  return (
    <Switch>
      <Route path="/groups/:groupId/children/" exact={true}>
        {currentUser?.role === "parent" ? (
          <ChildrenListPage />
        ) : (
          <Redirect to={`${currentUser?._id}/`} />
        )}
      </Route>
      <Route path="/groups/:groupId/children/:id" exact={true}>
        <SpecificChildPage />
      </Route>
      <Route path="/groups/:groupId/children/:id/tasks">
        <TasksRouter />
      </Route>
      <Route path="/groups/:groupId/children/:id/rewards">
        <RewardsRouter />
      </Route>
    </Switch>
  );
};

export default Router;
