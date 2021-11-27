import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../../../hooks";

import {
  Invitation as InvitationType,
  User as UserType,
} from "../../../../types";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, IconButton, ListItemAvatar, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { answerGroupInvitation } from "../../../../store/invitations/actions";
import { setStatus } from "../../../../store/utils/actions";
import { toastSuccess } from "../../../../utils/toasts";
import { getGroups } from "../../../../store/groups/actions";

const InvitationListItem: React.FC<InvitationType> = (invitation) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);
  const [fullName, setFullName] = React.useState<string>("");
  const [invAnswer, setInvAnswer] = React.useState<"accept" | "reject" | "">(
    ""
  );

  React.useEffect(() => {
    const sender = invitation.sender as UserType;
    setFullName(`${sender.name} ${sender.surname}`);
  }, [invitation.sender]);

  React.useEffect(() => {
    if (status === "success") {
      if (invAnswer === "accept") {
        toastSuccess("Invitation accepted successfully");
        dispatch(getGroups());
      }
      dispatch(setStatus(null));
    }
  }, [status, dispatch, invAnswer]);

  const handleInvAnswer = (answer: "accept" | "reject") => {
    console.log("xd");
    setInvAnswer(answer);
    dispatch(answerGroupInvitation(invitation._id, answer));
  };

  return (
    <React.Fragment>
      <ListItem
        secondaryAction={
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              aria-label="accept"
              size="small"
              onClick={() => handleInvAnswer("accept")}
            >
              <CheckIcon color="primary" fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="reject"
              size="small"
              onClick={() => handleInvAnswer("reject")}
            >
              <CloseIcon color="error" fontSize="small" />
            </IconButton>
          </Stack>
        }
      >
        <ListItemAvatar>
          <Avatar
            alt={fullName}
            src={(invitation.sender as UserType).profilePhoto}
          />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          secondary="Invited you to join his family"
        />
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default InvitationListItem;
