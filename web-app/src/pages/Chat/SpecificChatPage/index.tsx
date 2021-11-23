import { useEffect, useState, useRef } from "react";

import classes from "./index.module.scss";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import { useParams } from "react-router-dom";
import { History } from "history";
import { useHistory } from "react-router-dom";

import ContentLayout from "../../../layout/ContentLayout";
import Message from "../components/Message";

import { getChatData, sendMessage } from "../../../store/chat/actions";

import { Message as MessageType } from "../../../types";

const SpecificChatPage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((store) => store.chats.messages);
  const name = useAppSelector((store) => store.chats.name);
  const openedChatId = useAppSelector((store) => store.chats.openedChatId);
  const history = useHistory<History>();

  const { id } = useParams<{ id: string }>();

  const [messagesData, setMessagesData] = useState<MessageType[]>([]);
  const [input, setInput] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getChatData(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setMessagesData(messages);
  }, [messages]);

  const sendTextMessage = () => {
    if (!input) return;
    sendMessage(openedChatId, input);
    setInput("");
  };

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (window.innerWidth >= 900) {
      history.replace("/");
    }
  }, [history]);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView();
  }, []);

  return (
    <ContentLayout>
      <div className={classes.chat}>
        <p className={classes.chat__name}>{name}</p>
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
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SpecificChatPage;
