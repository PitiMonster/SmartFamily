import React from "react";

import classes from "./index.module.scss";

import logoImgPath from "../../../assets/icons/idea.svg";

import MainButton from "../../../components/buttons/MainButton";

const WelcomePage: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.backgroundImage} />
      <div className={classes.elements}>
        <div className={classes.elements__logo}>
          <img
            className={classes.elements__logo__img}
            src={logoImgPath}
            alt="logo"
          />
          <p className={classes.elements__logo__text}>Smart Family</p>
        </div>
        <div className={classes.elements__buttons}>
          <MainButton isOutline={true} text="Sign In" onClick={() => {}} />
          <MainButton isOutline={false} text="Sign Up" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
