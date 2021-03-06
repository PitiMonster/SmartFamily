import React from "react";

import { Location, History } from "history";
import { useLocation, useHistory } from "react-router-dom";

import classes from "./index.module.scss";

import logoImgPath from "../../../assets/icons/idea.svg";
import logoPhoneImgPath from "../../../assets/icons/family.svg";

import MainButton from "../../../components/buttons/MainButton";

const WelcomePage: React.FC = () => {
  const location = useLocation<Location>();
  const history = useHistory<History>();

  return (
    <div className={classes.container}>
      <div className={classes.backgroundImage} />
      <div className={classes.elements}>
        {window.innerWidth >= 900 ? (
          <div className={classes.elements__logo}>
            <img
              className={classes.elements__logo__img}
              src={logoImgPath}
              alt="logo"
              data-author-attribiution="Icon made by Freepik from www.flaticon.com"
            />
            <p className={classes.elements__logo__text}>Smart Family</p>
          </div>
        ) : (
          <div className={classes.elements__logo}>
            <img
              className={classes.elements__logo__img}
              src={logoPhoneImgPath}
              alt="logo"
              data-author-attribiution="Icon made by Freepik from www.flaticon.com"
            />
            <p className={classes.elements__logo__text}>Witaj!</p>
          </div>
        )}
        <div className={classes.elements__buttons}>
          <MainButton
            isOutline={true}
            text="Sign In"
            onClick={() => {
              history.push(`${location.pathname}/signin`);
            }}
          />
          <MainButton
            isOutline={false}
            text="Sign Up"
            onClick={() => {
              history.push(`${location.pathname}/signup`);
            }}
          />
        </div>
      </div>
      <p className={classes.attribiution}>Designed by Freepik</p>
    </div>
  );
};

export default WelcomePage;
