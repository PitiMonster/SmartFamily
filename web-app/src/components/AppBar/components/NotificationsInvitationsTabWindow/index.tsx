import * as React from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import {
  HtmlElements,
  User as UserType,
  Notification as NotificationType,
  Invitation as InvitationType,
} from "../../../../types";

import { useAppDispatch, useAppSelector } from "../../../../hooks";

import TabPanel from "../TabPanel";
import InvitationListItem from "../InvitationListItem";

const NotificationsInvitationsTabWindow = () => {
  const [value, setValue] = React.useState(0);
  const invitations = useAppSelector((state) => state.invitations.invitations);
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const [notificationsItems, setNotificationsItems] =
    React.useState<HtmlElements[]>();

  const [invitationsItems, setInvitationsItems] =
    React.useState<HtmlElements[]>();

  React.useEffect(() => {
    if (invitations && notifications) {
      const newNotificationsItems = (notifications as NotificationType[])?.map(
        (item) => (
          <React.Fragment key={item._id}>
            <ListItem>
              <ListItemText primary={item.text} />
            </ListItem>
            <Divider />
          </React.Fragment>
        )
      );

      const newInvitationsItems = (invitations as InvitationType[])?.map(
        (item) => <InvitationListItem key={item._id} {...item} />
      );

      setNotificationsItems(newNotificationsItems as any);
      setInvitationsItems(newInvitationsItems as any);
    }
  }, [notifications, invitations]);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  if (!notifications || !invitations) return <></>;

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-evenly",
          },
        }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Notifications" />
        <Tab label="Invitations" />
      </Tabs>

      <TabPanel value={value} index={0} data={notificationsItems} />
      <TabPanel value={value} index={1} data={invitationsItems} />
    </Box>
  );
};

export default NotificationsInvitationsTabWindow;
