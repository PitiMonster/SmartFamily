import React from "react";

import classes from "./index.module.scss";

const MainButton: React.FC<{
  isOutline: boolean;
  text: string;
  onClick: () => void;
}> = ({ isOutline, text, onClick }) => {
  return (
    <button
      className={[
        classes.button,
        isOutline ? classes.outline : classes.filled,
      ].join(" ")}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default MainButton;
