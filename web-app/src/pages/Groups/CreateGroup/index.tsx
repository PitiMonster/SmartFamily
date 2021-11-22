import { useState, useEffect } from "react";
import validator from "validator";

import classes from "./index.module.scss";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import { useHistory } from "react-router-dom";
import { History } from "history";

import FormControl from "@mui/material/FormControl";
import GroupIcon from "@mui/icons-material/Group";

import ContentLayout from "../../../layout/ContentLayout";
import ImageGalleryPicker from "../../../components/ImageGalleryPicker";
import TextInput from "../../../components/inputs/TextInput";
import MainButton from "../../../components/buttons/MainButton";
import { createGroup } from "../../../store/groups/actions";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { setStatus } from "../../../store/utils/actions";

interface Group {
  name: string;
  url: string;
}

const CreateGroupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);
  const history = useHistory<History>();

  const [groupName, setGroupName] = useState<string>("");
  const [pickedImage, setPickedImage] = useState<string>(
    "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/scary-faces.jpg"
  );
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const groupsData = [
      {
        name: "Grupa 1",
        url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/scary-faces.jpg",
      },
      {
        name: "Grupa 2",
        url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/lovely-cat.jpg",
      },
      {
        name: "Grupa 3",
        url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/circus-astronaut.jpg",
      },
      {
        name: "Grupa 4",
        url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/dab-unicorn.jpg",
      },
      {
        name: "Grupa 5",
        url: "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/disco-cat.jpg",
      },
    ];
    setGroups(groupsData);
  }, []);

  useEffect(() => {
    if (status === "success") {
      dispatch(setStatus(null));
      toastSuccess("Family created successfully!");
      history.replace("/");
    }
  }, [status]);

  const handleSave = () => {
    if (!groupName || !validator.isURL(pickedImage)) {
      toastError("All data is required");
      return;
    }

    dispatch(createGroup(groupName, pickedImage));
  };

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
          <MainButton isOutline={false} text="Save" onClick={handleSave} />
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
