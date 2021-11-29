import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import ListItemButton from "@mui/material/ListItemButton";
import { Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import classes from "./index.module.scss";

import { useAppSelector, useAppDispatch } from "../../../hooks";
import { useParams } from "react-router-dom";

import rewardImagePath from "../../../assets/images/rewardPhoto.jpg";

import ContentLayout from "../../../layout/ContentLayout";
import AddModifyRewardModal from "./components/AddModifyReward";

import { Reward as RewardType } from "../../../types";
import { getRewards, purchaseReward } from "../../../store/rewards/actions";
import { toastSuccess } from "../../../utils/toasts";
import { setStatus } from "../../../store/utils/actions";

interface RenderRewardOptions extends RewardType {
  photoId: string;
  handleSecondaryAction: () => void;
  onClick: () => void;
}

interface SelectedRewardData extends RewardType {
  title: string;
  photoId: string;
}

const RewardsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.loggedInUser);
  const rewards = useAppSelector((state) => state.rewards.rewards);
  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);
  const status = useAppSelector((state) => state.utils.status);
  const { id, groupId } = useParams<{ id: string; groupId: string }>();

  const [selectedRewardData, setSelectedRewardData] =
    useState<SelectedRewardData>({
      _id: "none",
      title: "Add reward",
      name: "",
      photo:
        "https://res.cloudinary.com/dq7ionfvn/image/upload/v1638111700/SmartFamily/QuestionMark.jpg",
      photoId: "SmartFamily/QuestionMark",
      points: 0,
      description: "",
    });
  const [isAddModifyRewardModal, setIsAddModifyRewardModal] =
    useState<boolean>(false);
  // const [rewardsList, setRewardsList] = useState<
  //   {
  //     name: string;
  //     photo: string;
  //     points: number;
  //     photoId: string;
  //     description: string;
  //   }[]
  // >([]);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddModifyRewardModal(false);
      // setSelectedRewardData({
      //   title: "Add reward",
      //   name: "",
      //   photo:
      //     "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
      //   photoId: "SmartFamily/piggy-bank",
      //   points: 0,
      //   description: "",
      // });
    }
  }, [isBackdrop]);

  useEffect(() => {
    if (status === "success" && currentUser?.role === "child") {
      dispatch(setStatus(null));
      toastSuccess("Reward bought successfully");
    }
  }, [status, dispatch, currentUser]);

  useEffect(() => {
    dispatch(getRewards(groupId, id));
  }, [dispatch, groupId, id]);

  const renderItem = ({
    _id,
    name,
    photo,
    photoId,
    points,
    description,
    handleSecondaryAction,
    onClick,
  }: RenderRewardOptions) => (
    <ListItem
      sx={{ paddingLeft: 0 }}
      secondaryAction={
        <Stack direction="row" alignItems="center">
          <ListItemText
            className={classes.list__points}
            primary={points}
            sx={{ paddingRight: "1rem" }}
          />
          <IconButton
            onClick={() => handleSecondaryAction()}
            color={currentUser?.role === "parent" ? "error" : "primary"}
          >
            {currentUser?.role === "parent" ? (
              // <DeleteIcon />
              <></>
            ) : (
              <ShoppingBasketIcon />
            )}
          </IconButton>
          <IconButton
            aria-label="info"
            title="Info"
            onClick={() => {
              // setSelectedRewardData({
              //   _id,
              //   title: "Modify reward",
              //   name,
              //   photo,
              //   photoId,
              //   points,
              //   description,
              // });
              // setIsAddModifyRewardModal(true);
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemAvatar>
        <Avatar alt="reward" src={photo} />
      </ListItemAvatar>
      <ListItemButton role={undefined} onClick={onClick} dense>
        <ListItemText className={classes.list__text} id={name} primary={name} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.container__image}>
          <img className={classes.image} src={rewardImagePath} alt="rewards" />
          <p className={classes.attribution}>
            Banner vector created by pch.vector - www.freepik.com
          </p>
        </div>
        <div className={classes.container__list}>
          <div className={classes.header}>
            <p className={classes.header__title}>Rewards</p>
            <IconButton
              color="primary"
              onClick={() => {
                setIsAddModifyRewardModal(true);
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
          <List className={classes.list}>
            <TransitionGroup>
              {rewards.map((item) =>
                renderItem({
                  ...item,
                  photoId: "default",
                  handleSecondaryAction: () => {
                    if (currentUser?.role === "parent") {
                      // remove item
                    } else if (currentUser?.role === "child") {
                      dispatch(purchaseReward(groupId, id, item._id));
                    }
                  },
                  onClick: () => {},
                })
              )}
            </TransitionGroup>
          </List>
        </div>
      </div>
      {isAddModifyRewardModal && (
        <AddModifyRewardModal
          groupId={groupId}
          childId={id}
          {...selectedRewardData}
        />
      )}
    </ContentLayout>
  );
};

export default RewardsListPage;
