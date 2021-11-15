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

import classes from "./index.module.scss";

import { useAppSelector } from "../../../hooks";

import rewardImagePath from "../../../assets/images/rewardPhoto.jpg";

import ContentLayout from "../../../layout/ContentLayout";
import AddModifyRewardModal from "./components/AddModifyReward";

interface RenderRewardOptions {
  name: string;
  photo: string;
  points: number;
  photoId: string;
  description: string;
  handleRemoveItem: (name: string) => void;
  onClick: () => void;
}

interface SelectedRewardData {
  title: string;
  photo: string;
  photoId: string;
  name: string;
  points: number;
  description: string;
}

const RewardsListPage: React.FC = () => {
  const [selectedRewardData, setSelectedRewardData] =
    useState<SelectedRewardData>({
      title: "Add reward",
      name: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
      photo: "",
      photoId: "SmartFamily/piggy-bank",
      points: 0,
      description: "",
    });
  const [isAddModifyRewardModal, setIsAddModifyRewardModal] =
    useState<boolean>(false);
  const [rewardsList, setRewardsList] = useState<
    {
      name: string;
      photo: string;
      points: number;
      photoId: string;
      description: string;
    }[]
  >([]);

  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddModifyRewardModal(false);
      setSelectedRewardData({
        title: "Add reward",
        name: "",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
        photoId: "SmartFamily/piggy-bank",
        points: 0,
        description: "",
      });
    }
  }, [isBackdrop]);

  useEffect(() => {
    const items = [
      {
        name: "Do homework",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/piggy-bank.png",
        photoId: "SmartFamily/piggy-bank",

        points: 25,
        description: "Tem desc",
      },
      {
        name: "Do homework",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/piggy-bank.png",
        photoId: "SmartFamily/piggy-bank",

        points: 25,
        description: "Tem desc",
      },
      {
        name: "Do homework",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/piggy-bank.png",
        photoId: "SmartFamily/piggy-bank",

        points: 25,
        description: "Tem desc",
      },
      {
        name: "Do homework",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/piggy-bank.png",
        photoId: "SmartFamily/piggy-bank",

        points: 25,
        description: "Tem desc",
      },
      {
        name: "Do homework",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/piggy-bank.png",
        photoId: "SmartFamily/piggy-bank",

        points: 25,
        description: "Tem desc",
      },
    ];
    setRewardsList(items);
  }, []);

  const renderItem = ({
    name,
    photo,
    photoId,
    points,
    description,
    handleRemoveItem,
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
            aria-label="delete"
            title="Delete"
            onClick={() => handleRemoveItem(name)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="info"
            title="Info"
            onClick={() => {
              setSelectedRewardData({
                title: "Modify reward",
                name,
                photo,
                photoId,
                points,
                description,
              });
              setIsAddModifyRewardModal(true);
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
              {rewardsList.map((item) =>
                renderItem({
                  ...item,
                  handleRemoveItem: (name) => {},
                  onClick: () => {},
                })
              )}
            </TransitionGroup>
          </List>
        </div>
      </div>
      {isAddModifyRewardModal && (
        <AddModifyRewardModal {...selectedRewardData} />
      )}
    </ContentLayout>
  );
};

export default RewardsListPage;
