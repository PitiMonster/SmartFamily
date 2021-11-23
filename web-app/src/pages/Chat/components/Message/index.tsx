import { useState, useEffect } from "react";

import classes from "./index.module.scss";

import { Message as MessageType } from "../../../../types";

const Message: React.FC<MessageType> = (props) => {
  const [messageClasses, setMessageClasses] = useState<string[]>([
    classes.container,
  ]);

  useEffect(() => {
    const newClasses: string[] = [classes.container];
    newClasses.push(
      (props.author as any)._id === (localStorage.getItem("userId") as string)
        ? classes.authorMe
        : classes.authorYou
    );
    setMessageClasses(newClasses);
  }, [props.author]);

  return <li className={messageClasses.join(" ")}>{props.text}</li>;
};

export default Message;
