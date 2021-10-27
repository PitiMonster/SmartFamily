import React from "react";

import classes from "./index.module.scss";
import logoImgPath from "../../assets/icons/idea.svg";

const AuthorizationPageLayout: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img className={classes.logo__image} src={logoImgPath} alt="logo" />
        <p className={classes.logo__name}>Smart Family</p>
      </div>
      <div className={classes.children}>{children}</div>
    </div>
  );
};

export default AuthorizationPageLayout;
