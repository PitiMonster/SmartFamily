import React from "react";

import { Location, History } from "history";
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";

import classes from "./index.module.scss";

import logoImgPath from "../../../assets/icons/idea.svg";

import LoginPage from "../Login";
import RegisterPage from "../Register";
import MainButton from "../../../components/buttons/MainButton";

const WelcomePage: React.FC = () => {
  const location = useLocation<Location>();
  const history = useHistory<History>();

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
          <MainButton
            isOutline={true}
            text="Sign In"
            onClick={() => {
              history.push(`${location.pathname}signin`);
            }}
          />
          <MainButton
            isOutline={false}
            text="Sign Up"
            onClick={() => {
              history.push(`${location.pathname}signup`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
