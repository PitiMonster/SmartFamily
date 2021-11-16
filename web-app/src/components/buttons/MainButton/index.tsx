import React from "react";

import classes from "./index.module.scss";

const MainButton: React.FC<{
  isOutline: boolean;
  text: string;
  onClick: () => void;
  disabled?: boolean;
  style?: Object;
  type?: "button" | "submit" | "reset" | undefined;
}> = ({
  isOutline,
  text,
  onClick,
  disabled = false,
  style,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={[
        classes.button,
        isOutline ? classes.outline : classes.filled,
      ].join(" ")}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MainButton;
