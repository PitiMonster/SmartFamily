import { useState, useEffect, useRef } from "react";
import moment from "moment";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import { History } from "history";
import { useHistory } from "react-router-dom";

import classes from "./index.module.scss";

import ContentLayout from "../../../layout/ContentLayout";
import Message from "../components/Message";

import { Chat as ChatType } from "../../../types";
import {
  getChats,
  getChatData,
  readChat,
  sendMessage,
  clearState,
} from "../../../store/chat/actions";

import { Message as MessageType, User as UserType } from "../../../types";
import { readUnreadMessage } from "../../../utils/countUnreadMessages";

interface RenderChatItemOptions extends ChatType {
  onClick: (id: string, readByMembers: (string | UserType)[]) => void;
}

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats.chats);
  const chatMessages = useAppSelector((state) => state.chats.messages);
  const chatName = useAppSelector((state) => state.chats.name);
  const openedChatId = useAppSelector((state) => state.chats.openedChatId);

  const history = useHistory<History>();

  const [chatsData, setChatsData] = useState<ChatType[]>([]);
  const [messagesData, setMessagesData] = useState<MessageType[]>([]);
  const [input, setInput] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getChats());
    messagesEndRef?.current?.scrollIntoView();
  }, [dispatch]);

  useEffect(() => {
    setChatsData(chats);
    !chatName && chats.length > 0 && dispatch(getChatData(chats[0]._id));
  }, [chats, dispatch, chatName]);

  useEffect(() => {
    setMessagesData(chatMessages);
    dispatch(readChat(openedChatId));
  }, [chatMessages, openedChatId, dispatch]);

  useEffect(() => {
    return dispatch(clearState());
  }, [dispatch]);

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput((event.target as HTMLInputElement).value);
  };

  const sendTextMessage = () => {
    if (!input) return;
    sendMessage(openedChatId, input);
    setInput("");
  };

  const onChatItemClick = (
    id: string,
    readByMembers: (string | UserType)[]
  ) => {
    if (id && id !== openedChatId) {
      readUnreadMessage(id);
      if (!readByMembers.includes(localStorage.getItem("userId") as string)) {
        dispatch(readChat(id));
      }
      if (window.innerWidth < 900) {
        history.push(`/chats/${id}`);
      } else {
        dispatch(getChatData(id));
      }
    }
  };

  const renderItem = ({
    name,
    photo,
    readByMembers,
    lastMessageDate,
    onClick,
    _id = "tempId",
  }: RenderChatItemOptions) => (
    <ListItem
      onClick={() => onClick(_id, readByMembers)}
      sx={{
        paddingLeft: 0,
        backgroundColor: openedChatId === _id ? "#7eeb90" : "transparent",
      }}
      className={classes.chatLI}
      secondaryAction={
        <p>{moment(new Date(lastMessageDate)).format("HH:mm")}</p>
      }
    >
      <ListItemAvatar>
        <Avatar alt="reward" src={photo} />
      </ListItemAvatar>
      <ListItemText
        sx={{
          "& .MuiTypography-root": {
            fontWeight: readByMembers.includes(
              localStorage.getItem("userId") as string
            )
              ? 400
              : 500,
          },
        }}
        className={classes.list__text}
        primary={name}
      />
    </ListItem>
  );

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.list}>
          <p className={classes.list__title}>Chats</p>
          <ul className={classes.list__chats}>
            {chatsData.map((item) =>
              renderItem({ ...item, onClick: onChatItemClick })
            )}
          </ul>
        </div>
        <div className={classes.chat}>
          <p className={classes.chat__name}>{chatName}</p>
          <ul className={classes.chat__messages}>
            {[
              <div ref={messagesEndRef} />,
              messagesData.map((item) => <Message key={item._id} {...item} />),
            ]}
          </ul>
          <div className={classes.inputContainer}>
            <input
              className={classes.messageInput}
              type="text"
              value={input}
              onChange={handleMessageInputChange}
              placeholder="Aa"
            />
            <IconButton color="primary" onClick={sendTextMessage}>
              <SendIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Chat;
