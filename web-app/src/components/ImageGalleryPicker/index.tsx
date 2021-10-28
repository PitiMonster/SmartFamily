import { useState, useEffect } from "react";

import classes from "./index.module.scss";

const ImageBlock: React.FC<{
  url: string;
  isPicked: boolean;
  onClick: () => void;
}> = ({ url, isPicked, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundImage: `url(${url})`,
      }}
      className={
        isPicked ? [classes.image, classes.picked].join(" ") : classes.image
      }
    />
  );
};

type ImageObject = {
  url: string;
};

const ImageGalleryPicker: React.FC<{
  images: ImageObject[];
  pickedImage: string;
  setPickedImage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ images, pickedImage, setPickedImage }) => {
  const [imagesList, setImagesList] = useState<
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >[]
    | undefined
  >([]);

  useEffect(() => {
    const newImagesList = images.map((image) => (
      <ImageBlock
        url={image.url}
        isPicked={pickedImage === image.url}
        onClick={() => setPickedImage(image.url)}
      />
    ));

    setImagesList(newImagesList);
  }, [images]);

  return <div className={classes.container}>{imagesList}</div>;
};

export default ImageGalleryPicker;
