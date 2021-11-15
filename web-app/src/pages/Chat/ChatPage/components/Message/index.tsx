import { useState, useEffect } from "react";

import classes from "./index.module.scss";

const Message: React.FC<{ author: string; text: string; createdAt: Date }> = (
  props
) => {
  const [messageClasses, setMessageClasses] = useState<string[]>([
    classes.container,
  ]);

  useEffect(() => {
    const newClasses: string[] = [classes.container];
    newClasses.push(
      props.author === "me" ? classes.authorMe : classes.authorYou
    );
    setMessageClasses(newClasses);
  }, [props.author]);

  return <li className={messageClasses.join(" ")}>{props.text}</li>;
};

export default Message;
