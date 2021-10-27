import classes from "./index.module.scss";

import AppBar from "../../components/AppBar";

const ContentLayout: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <AppBar />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default ContentLayout;
