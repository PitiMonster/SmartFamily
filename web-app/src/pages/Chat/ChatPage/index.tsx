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
import { getChats } from "../../../store/chat/actions";

interface RenderChatItemOptions extends ChatType {
  onClick: (id: string) => void;
}

interface MessageItemOptions {
  author: string;
  text: string;
  createdAt: Date;
}

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats.chats);

  const history = useHistory<History>();

  const [chatsData, setChatsData] = useState<ChatType[]>([]);
  const [messagesData, setMessagesData] = useState<MessageItemOptions[]>([]);
  const [input, setInput] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getChats());
    messagesEndRef?.current?.scrollIntoView();
  }, [dispatch]);

  useEffect(() => {
    // const data = [
    //   {
    //     name: "test name",
    //     photo:
    //       "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
    //     unread: true,
    //     onClick: onChatItemClick,
    //   },
    //   {
    //     name: "test name",
    //     photo:
    //       "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
    //     unread: true,
    //     onClick: onChatItemClick,
    //   },
    //   {
    //     name: "test name",
    //     photo:
    //       "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
    //     unread: true,
    //     onClick: onChatItemClick,
    //   },
    //   {
    //     name: "test name",
    //     photo:
    //       "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
    //     unread: false,
    //     onClick: onChatItemClick,
    //   },
    //   {
    //     name: "test name",
    //     photo:
    //       "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
    //     unread: false,
    //     onClick: onChatItemClick,
    //   },
    //   {
    //     name: "test name",
    //     photo:
    //       "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
    //     unread: false,
    //     onClick: onChatItemClick,
    //   },
    //   {
    //     name: "test name",
    //     photo:
    //       "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg",
    //     unread: true,
    //     onClick: onChatItemClick,
    //   },
    // ];
    console.log(chats);
    setChatsData(chats);
  }, [chats]);

  useEffect(() => {
    const data = [
      {
        author: "me",
        text: "hej",
        createdAt: new Date(Date.now()),
      },
      {
        author: "you",
        text: "hej",
        createdAt: new Date(Date.now()),
      },
      {
        author: "you",
        text: "co tam słychać w wielkim świecie?",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "aaaa dobrze, wszystko gra :D",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "słyszałeś nowy żarcik?",
        createdAt: new Date(Date.now()),
      },
      {
        author: "you",
        text: "nie nie, nowego nie słyszałem",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "to słuchaj",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: `Rozmawiają dwie koleżanki:\n- Wczoraj w restauracji musieliśmy długo czekać na stolik.\n- Ja z tym nie mam problemu.\nWyjmuję telefon i głośno mówię do słuchawki:\nKochana, przyjdź szybko, Twój mąż tu siedzi z jakąś babą!\nZawsze zwalnia się kilka stolików...`,
        createdAt: new Date(Date.now()),
      },
      {
        author: "you",
        text: "haha",
        createdAt: new Date(Date.now()),
      },
      {
        author: "you",
        text: "dobre dobre",
        createdAt: new Date(Date.now()),
      },
      {
        author: "you",
        text: "mozna kiedyś przetestować",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "hah no czemu nie",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "śmiesznie może być",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "test",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "test",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "test",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "test",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "test",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "test",
        createdAt: new Date(Date.now()),
      },
      {
        author: "me",
        text: "test",
        createdAt: new Date(Date.now()),
      },
    ];

    setMessagesData(data.reverse());
  }, []);

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput((event.target as HTMLInputElement).value);
  };

  const onChatItemClick = (id: string) => {
    if (id) {
      // fetch data from db / redux
      if (window.innerWidth < 900) {
        history.push(`/:${id}`);
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
      onClick={() => onClick(_id)}
      sx={{ paddingLeft: 0 }}
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
          <p className={classes.chat__name}>Nazwa rodziny</p>
          <ul className={classes.chat__messages}>
            {[
              <div ref={messagesEndRef} />,
              messagesData.map((item) => <Message {...item} />),
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
            <IconButton color="primary" onClick={() => {}}>
              <SendIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Chat;
