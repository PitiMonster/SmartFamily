import classes from "./index.module.scss";

const ChildrenListItem: React.FC<{ name: string; photo: string }> = ({
  name,
  photo,
}) => {
  return (
    <div className={classes.container}>
      <img className={classes.photo} src={photo} alt={`${name}`} />
      <p className={classes.name}>{name}</p>
    </div>
  );
};

export default ChildrenListItem;
