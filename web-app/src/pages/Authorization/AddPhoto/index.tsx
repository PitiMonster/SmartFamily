import React, { useEffect, useState } from "react";

import { AdvancedImage } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { GravityQualifier } from "@cloudinary/url-gen/qualifiers/gravity/GravityQualifier";

import { History } from "history";
import { useHistory } from "react-router-dom";

import classes from "./index.module.scss";

import AuthLayout from "../../../layout/AuthLayout";
import { cloudinaryUploadWidget, cld } from "../../../utils/cloudinary";
import MainButton from "../../../components/buttons/MainButton";

const AddPhotoPage: React.FC = () => {
  const history = useHistory<History>();

  const [cloudinaryWidget, setCloudinaryWidget] = useState<any>(null);
  const [profilePhotoId, setProfilePhotoId] = useState<string>(
    "SmartFamily/default_person"
  );
  const [userProfilePhoto, setUserProfilePhoto] = useState<any>();
  const [photoUrl, setPhotoUrl] = useState<string>(
    "https://res.cloudinary.com/dq7ionfvn/image/upload/v1634891263/SmartFamily/default_person.jpg"
  );

  useEffect(() => {
    const action = (id: string, url: string) => {
      setProfilePhotoId(id);
      setPhotoUrl(url);
    };
    setCloudinaryWidget(cloudinaryUploadWidget(action));
    setProfilePhotoId("SmartFamily/default_person");
  }, []);

  useEffect(() => {
    console.log(profilePhotoId);
    const profilePhoto = cld?.image(profilePhotoId);

    profilePhoto
      ?.resize(
        thumbnail().width(200).height(200).gravity(new GravityQualifier("face"))
      ) // Crop the image, focusing on the face.
      .roundCorners(max());
    setUserProfilePhoto(profilePhoto);
  }, [profilePhotoId, cld]);

  return (
    <AuthLayout>
      <div className={classes.container}>
        <p className={classes.title}>Dodaj swoje zdjęcie profilowe</p>
        {console.log(profilePhotoId)}
        {console.log(userProfilePhoto)}
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
        <MainButton
          isOutline={true}
          text="Wybierz zdjęcie"
          onClick={() => {
            cloudinaryWidget?.open();
          }}
        />
        <div className={classes.buttonsContainer}>
          <MainButton
            isOutline={false}
            text="Pomiń"
            onClick={() => {
              history.push("/signup/choose-role");
            }}
            style={{ backgroundColor: "#6f6f6f" }}
          />
          <MainButton
            isOutline={false}
            text="Zatwierdź"
            onClick={() => {
              history.push("/signup/choose-role");
            }}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default AddPhotoPage;
