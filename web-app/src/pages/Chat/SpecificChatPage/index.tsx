import { useEffect, useState, useRef } from "react";

import classes from "./index.module.scss";

import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import { useParams } from "react-router-dom";
import { History } from "history";
import { useHistory } from "react-router-dom";

import ContentLayout from "../../../layout/ContentLayout";
import Message from "../components/Message";

interface MessageItemOptions {
  author: string;
  text: string;
  createdAt: Date;
}

const SpecificChatPage: React.FC<{}> = () => {
  const history = useHistory<History>();

  const { id } = useParams<{ id: string }>();

  const [messagesData, setMessagesData] = useState<MessageItemOptions[]>([]);
  const [input, setInput] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (id) {
      // fetch chat messages data
    }
  }, [id]);

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

  return (
    <ContentLayout>
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
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SpecificChatPage;
