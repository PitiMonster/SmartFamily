import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import TaskIcon from "@mui/icons-material/Task";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useParams } from "react-router-dom";

import { History } from "history";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import classes from "./index.module.scss";

import ContentLayout from "../../../layout/ContentLayout";

import { User as UserType } from "../../../types";
import { getOneChild } from "../../../store/children/actions";

const SpecificChildPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.loggedInUser);
  const selectedChild = useAppSelector((state) => state.children.selectedChild);
  const { id, groupId } = useParams<{ id: string; groupId: string }>();
  const history = useHistory<History>();

  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [user, setUser] = useState<UserType | undefined>();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (id) {
      if (id === user?._id) {
        setImage(user.profilePhoto);
        setName(user.name);
        console.log("mypoints", (user?.pointsCount as any)[groupId] as string);
        setPoints(((user?.pointsCount as any)[groupId] as number) ?? 0);
      } else {
        dispatch(getOneChild(groupId, id));
      }
    }
  }, [id, user, dispatch, groupId]);

  useEffect(() => {
    if (selectedChild && selectedChild?._id !== user?._id) {
      setImage(selectedChild.profilePhoto);
      setName(selectedChild.name);
      setPoints((selectedChild.points as number) ?? 0);
    }
  }, [selectedChild, user]);

  if (!user) return <></>;

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.data}>
          <div
            className={classes.data__image}
            style={{ backgroundImage: `url(${image})` }}
          />
          <p className={classes.data__name}>{name}</p>
          <p className={classes.data__points}>{points} pts</p>
        </div>
        <div className={classes.menu}>
          <FormControlLabel
            control={
              <IconButton
                onClick={() => {
                  history.push("tasks/");
                }}
              >
                <TaskIcon />
              </IconButton>
            }
            label="Tasks"
          />
          <FormControlLabel
            control={
              <IconButton onClick={() => history.push("rewards/")}>
                <CardGiftcardIcon />
              </IconButton>
            }
            label="Rewards"
          />
          {user.role === "parent" && (
            <FormControlLabel
              control={
                <IconButton>
                  <LocationOnIcon />
                </IconButton>
              }
              label="Location"
            />
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default SpecificChildPage;
