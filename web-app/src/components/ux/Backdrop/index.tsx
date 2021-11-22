import classes from "./index.module.scss";

import { useAppDispatch } from "../../../hooks";
import { updateBackdrop } from "../../../store/utils/actions";

const Backdrop: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(updateBackdrop(false));
  };

  return <div className={classes.backdrop} onClick={handleOnClick} />;
};

export default Backdrop;
