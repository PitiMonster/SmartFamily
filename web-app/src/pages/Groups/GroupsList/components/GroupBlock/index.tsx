import classes from "./index.module.scss";

const GroupBlock: React.FC<{
  photo: string;
  name: string;
  onClick: () => any;
}> = ({ photo, name, onClick }) => {
  return (
    <div className={classes.container} onClick={onClick}>
      <div
        style={{ backgroundImage: `url(${photo})` }}
        className={classes.image}
      />
      <p className={classes.name}>{name}</p>
    </div>
  );
};

export default GroupBlock;
