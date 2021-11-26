import classes from "./index.module.scss";

import { User as UserType } from "../../../../../types";

import { useHistory } from "react-router-dom";
import { History } from "history";

const ChildrenListItem: React.FC<UserType> = (props) => {
  const history = useHistory<History>();

  return (
    <div
      className={classes.container}
      onClick={() => {
        history.push(`${props._id}/`);
      }}
    >
      <div
        className={classes.photo}
        style={{ backgroundImage: `url(${props.profilePhoto})`, margin: "1px" }}
      />
      <p className={classes.name}>{props.name}</p>
    </div>
  );
};

export default ChildrenListItem;
