import { useState, useEffect } from "react";

import classes from "./index.module.scss";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import GroupBlock from "../components/GroupBlock";

import { useHistory } from "react-router-dom";
import { History } from "history";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import ContentLayout from "../../../layout/ContentLayout";

import InviteToGroupModal from "./components/InviteToGroupModal";

const SpecificGroupPage: React.FC = () => {
  const history = useHistory<History>();

  const currentUser = useAppSelector((state) => state.user.loggedInUser);
  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  const { groupId } = useParams<{ groupId: string }>();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [funcBlocks, setFuncBlocks] = useState<
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >[]
    | undefined
  >([]);

  useEffect(() => {
    if (!isBackdrop) {
      setIsInviteModalOpen(false);
    }
  }, [isBackdrop]);

  useEffect(() => {
    const data = [
      {
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/calendar.png",
        name: "Calendar",
        onClick: () => {
          history.push(`calendar`);
        },
        isBorder: true,
      },
      {
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/piggy-bank.png",
        name: "Budgets",
        onClick: () => {
          history.push(`budgets/`);
        },
        isBorder: true,
      },
      {
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/shop.png",
        name: "Shopping List",
        onClick: () => {
          history.push(`shopping/`);
        },
        isBorder: true,
      },
    ];

    data.push(
      currentUser?.role === "parent"
        ? {
            photo:
              "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/children.png",
            name: "Children",
            onClick: () => {
              history.push(`children/`);
            },
            isBorder: true,
          }
        : {
            photo:
              "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/goal.png",
            name: "Tasks and rewards",
            onClick: () => {
              history.push(`children/`);
            },
            isBorder: true,
          }
    );

    const newFuncObjects = data.map((object) => (
      <GroupBlock key={object.name} {...object} />
    ));
    setFuncBlocks(newFuncObjects);
  }, [history]);

  return (
    <ContentLayout>
      <div className={classes.container}>
        {currentUser?.role === "parent" ? (
          <div className={classes.header}>
            <p className={classes.header__title}>Invite family member</p>
            <IconButton
              color="primary"
              onClick={() => setIsInviteModalOpen(true)}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
        ) : (
          <div className={classes.header} style={{ marginBottom: "10rem" }} />
        )}
        <div className={classes.container__list}>{funcBlocks}</div>
      </div>
      <p className={classes.attribiution}>
        Icons made by Freepik from www.flaticon.com
      </p>
      {isInviteModalOpen && <InviteToGroupModal groupId={groupId} />}
    </ContentLayout>
  );
};

export default SpecificGroupPage;
