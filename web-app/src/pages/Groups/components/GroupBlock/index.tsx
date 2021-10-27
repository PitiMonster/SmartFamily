import { useState, useEffect } from "react";

import classes from "./index.module.scss";

const GroupBlock: React.FC<{
  photo: string;
  name: string;
  onClick: () => any;
  isBorder?: boolean;
}> = ({ photo, name, onClick, isBorder = false }) => {
  const [containerClasses, setContainerClasses] = useState<Object[]>([
    classes.container,
  ]);
  useEffect(() => {
    if (isBorder) {
      setContainerClasses([classes.container, classes.border]);
    }
  }, [isBorder]);

  return (
    <div className={containerClasses.join(" ")} onClick={onClick}>
      <div
        style={{ backgroundImage: `url(${photo})` }}
        className={classes.image}
      />
      <p className={classes.name}>{name}</p>
    </div>
  );
};

export default GroupBlock;
