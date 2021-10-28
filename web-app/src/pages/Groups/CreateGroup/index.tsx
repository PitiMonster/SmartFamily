import { useState } from "react";

import classes from "./index.module.scss";

import FormControl from "@mui/material/FormControl";
import GroupIcon from "@mui/icons-material/Group";

import ContentLayout from "../../../layout/ContentLayout";
import ImageGalleryPicker from "../../../components/ImageGalleryPicker";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";

const CreateGroupPage: React.FC = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [pickedImage, setPickedImage] = useState<string>(
    "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/scary-faces.jpg"
  );
  const groups = [
    {
      name: "Grupa 1",
      url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/scary-faces.jpg",
      onClick: () => {},
    },
    {
      name: "Grupa 2",
      url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/lovely-cat.jpg",
      onClick: () => {},
    },
    {
      name: "Grupa 3",
      url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/circus-astronaut.jpg",
      onClick: () => {},
    },
    {
      name: "Grupa 4",
      url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/dab-unicorn.jpg",
      onClick: () => {},
    },
    {
      name: "Grupa 5",
      url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/disco-cat.jpg",
      onClick: () => {},
    },
    {
      name: "Utwórz grupę",
      url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/new-group.jpg",
      onClick: () => {},
    },
  ];
  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.container__left}>
          <p className={classes.title}>Create group</p>
          <img
            className={classes.photo}
            src={pickedImage}
            alt="selected group"
          />
          <FormControl
            variant="standard"
            color="primary"
            className={classes.input}
          >
            <TextInput
              text={groupName}
              setText={setGroupName}
              label="Group name"
              icon={<GroupIcon />}
            />
          </FormControl>
          <MainButton isOutline={false} text="Save" onClick={() => {}} />
        </div>
        <div className={classes.container__right}>
          <ImageGalleryPicker
            images={groups}
            setPickedImage={setPickedImage}
            pickedImage={pickedImage}
          />
        </div>
      </div>
    </ContentLayout>
  );
};

export default CreateGroupPage;
