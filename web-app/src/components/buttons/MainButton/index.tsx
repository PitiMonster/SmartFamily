import React from "react";

import classes from "./index.module.scss";

const MainButton: React.FC<{
  isOutline: boolean;
  text: string;
  onClick: () => any;
  style?: Object;
}> = ({ isOutline, text, onClick, style }) => {
  return (
    <button
      className={[
        classes.button,
        isOutline ? classes.outline : classes.filled,
      ].join(" ")}
      onClick={() => onClick()}
      style={style}
    >
      {text}
    </button>
  );
};

export default MainButton;
