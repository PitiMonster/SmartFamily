import classes from "./index.module.scss";

const ChildrenListItem: React.FC<{ name: string; photo: string }> = ({
  name,
  photo,
}) => {
  return (
    <div className={classes.container}>
      <div
        className={classes.photo}
        style={{ backgroundImage: `url(${photo})`, margin: "1px" }}
      />
      <p className={classes.name}>{name}</p>
    </div>
  );
};

export default ChildrenListItem;
