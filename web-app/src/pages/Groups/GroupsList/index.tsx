import { useEffect, useState } from "react";

import classes from "./index.module.scss";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import { useHistory, useLocation } from "react-router-dom";
import { History } from "history";

import { getGroups } from "../../../store/groups/actions";

import GroupBlock from "../components/GroupBlock";
import ContentLayout from "../../../layout/ContentLayout";

import { HtmlElements } from "../../../types";

const GroupsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups.groups);
  const currentUser = useAppSelector((state) => state.user.loggedInUser);
  const history = useHistory<History>();

  const location = useLocation() as any;

  const [groupBlocks, setGroupBlocks] = useState<HtmlElements>([]);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  useEffect(() => {
    const newGroups = groups.slice();
    currentUser?.role === "parent" &&
      newGroups.push({
        _id: "create-new",
        name: "Utwórz grupę",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/new-group.jpg",
      });

    const newBlockGroups = newGroups.map((group, index) => (
      <GroupBlock
        key={group._id}
        {...group}
        onClick={() => history.push(`/groups/${group._id}/`)}
      />
    ));

    setGroupBlocks(newBlockGroups);
  }, [groups, history, currentUser]);

  return (
    <ContentLayout>
      <div className={classes.container}>{groupBlocks}</div>;
      <a
        className={classes.attribiution}
        href="https://www.freepik.com/vectors/logo"
      >
        Logo vector created by catalyststuff - www.freepik.com
      </a>
    </ContentLayout>
  );
};

export default GroupsListPage;
