import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import TaskIcon from "@mui/icons-material/Task";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useParams } from "react-router-dom";

import classes from "./index.module.scss";

import ContentLayout from "../../../layout/ContentLayout";

const SpecificChildPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [image, setImage] = useState<string>(
    "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/girl.png"
  );
  const [name, setName] = useState<string>("Igor");
  const [points, setPoints] = useState<number>(20);

  useEffect(() => {
    if (id) {
      // fetch child data
    }
  }, [id]);

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.data}>
          <div
            className={classes.data__image}
            style={{ backgroundImage: `url(${image})` }}
          />
          <p className={classes.data__name}>{name}</p>
          <p className={classes.data__points}>{points}</p>
        </div>
        <div className={classes.menu}>
          <FormControlLabel
            control={
              <IconButton>
                <TaskIcon />
              </IconButton>
            }
            label="Tasks"
          />
          <FormControlLabel
            control={
              <IconButton>
                <CardGiftcardIcon />
              </IconButton>
            }
            label="Rewards"
          />
          <FormControlLabel
            control={
              <IconButton>
                <LocationOnIcon />
              </IconButton>
            }
            label="Location"
          />
        </div>
      </div>
    </ContentLayout>
  );
};

export default SpecificChildPage;
