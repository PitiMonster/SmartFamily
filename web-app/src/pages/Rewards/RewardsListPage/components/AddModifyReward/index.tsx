import { useEffect, useState } from "react";

import { AdvancedImage } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { GravityQualifier } from "@cloudinary/url-gen/qualifiers/gravity/GravityQualifier";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";

import classes from "./index.module.scss";

import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { setStatus, updateBackdrop } from "../../../../../store/utils/actions";

import TextInput from "../../../../../components/inputs/TextInput";
import MainButton from "../../../../../components/buttons/MainButton";
import { cloudinaryUploadWidget, cld } from "../../../../../utils/cloudinary";

import { Reward as RewardType } from "../../../../../types";
import { createReward } from "../../../../../store/rewards/actions";
import { toastError, toastSuccess } from "../../../../../utils/toasts";

interface PropsType extends RewardType {
  title: string;
  photoId: string;
  groupId: string;
  childId: string;
}

const AddModifyRewardModal: React.FC<PropsType> = ({
  groupId,
  childId,
  _id,
  title,
  name,
  photo,
  photoId,
  points,
  description,
}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.utils.status);
  const [rewardName, setRewardName] = useState<string>("");
  const [rewardPoints, setRewardPoints] = useState<string>("");
  const [rewardPhoto, setRewardPhoto] = useState<string>("");
  const [rewardDescription, setRewardDescription] = useState<string>("");

  const [cloudinaryWidget, setCloudinaryWidget] = useState<any>(null);
  const [profilePhotoId, setProfilePhotoId] = useState<string>(photoId);
  const [userProfilePhoto, setUserProfilePhoto] = useState<any>();

  useEffect(() => {
    const action = (id: string, url: string) => {
      setProfilePhotoId(id);
      setRewardPhoto(url);
    };
    setCloudinaryWidget(cloudinaryUploadWidget(action));
    setProfilePhotoId(photoId);
  }, [photoId]);

  useEffect(() => {
    const profilePhoto = cld?.image(profilePhotoId);

    profilePhoto
      ?.resize(
        thumbnail().width(200).height(200).gravity(new GravityQualifier("face"))
      ) // Crop the image, focusing on the face.
      .roundCorners(max());
    setUserProfilePhoto(profilePhoto);
  }, [profilePhotoId, cld]);

  useEffect(() => {
    dispatch(updateBackdrop(true));
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      toastSuccess("Reward created successfully");
      dispatch(updateBackdrop(false));
      dispatch(setStatus(null));
    }
  }, [status, dispatch]);

  useEffect(() => {
    setRewardName(name);
    setRewardPoints(points.toString());
    setRewardPhoto(photo);
    setRewardDescription(description as string);
  }, [name, points, photo, description]);

  const handleSave = () => {
    if (!rewardName || !rewardPoints) {
      toastError("Name and points fields are required");
      return;
    }

    if (points < 0) {
      toastError("Points field value cannot be negative");
      return;
    }

    dispatch(
      createReward(
        groupId,
        childId,
        rewardName,
        rewardPhoto,
        rewardPoints,
        rewardDescription
      )
    );
  };

  return (
    <div className={classes.modal}>
      <p className={classes.title}>{title}</p>
      {userProfilePhoto ? (
        <AdvancedImage
          cldImg={userProfilePhoto}
          onClick={() => cloudinaryWidget?.open()}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "transparent",
          }}
        ></div>
      )}
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={rewardName}
          setText={setRewardName}
          label="Reward name"
        />
      </FormControl>
      <FormControl variant="standard" color="primary" className={classes.input}>
        <TextInput
          text={rewardPoints}
          setText={setRewardPoints}
          label="Points"
        />
      </FormControl>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={8}
        maxRows={8}
        placeholder="Reward description"
        value={rewardDescription}
        onChange={(event) => setRewardDescription(event.target.value)}
      />
      <MainButton isOutline={true} text="Save" onClick={handleSave} />
    </div>
  );
};

export default AddModifyRewardModal;
