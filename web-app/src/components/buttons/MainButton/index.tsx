import React from "react";

import classes from "./index.module.scss";

const MainButton: React.FC<{
  isOutline: boolean;
  text: string;
  onClick: () => any;
  disabled?: boolean;
  style?: Object;
}> = ({ isOutline, text, onClick, disabled = false, style }) => {
  return (
    <button
      className={[
        classes.button,
        isOutline ? classes.outline : classes.filled,
      ].join(" ")}
      onClick={() => onClick()}
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MainButton;
