import classes from "./index.module.scss";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const ListItem: React.FC<{
  photo?: string;
  primaryText: string;
  secondaryText?: string;
  trailingText: string;
  onClick?: () => void;
}> = ({ photo, primaryText, secondaryText, trailingText, onClick }) => {
  return (
    <li className={classes.container} onClick={onClick}>
      <div className={classes.beginningPart}>
        {photo && <img className={classes.photo} src={photo} alt="list item" />}
        <div className={classes.beginningPart__texts}>
          <p className={classes.primary}>{primaryText}</p>
          {secondaryText && (
            <p className={classes.secondary}>{secondaryText}</p>
          )}
        </div>
      </div>
      <div className={classes.trailingPart}>
        <p className={classes.trailingPart__text}>{trailingText}</p>
        {onClick && (
          <IconButton
            aria-label="toggle password visibility"
            onClick={onClick}
            onMouseDown={onClick}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        )}
      </div>
    </li>
  );
};

export default ListItem;
