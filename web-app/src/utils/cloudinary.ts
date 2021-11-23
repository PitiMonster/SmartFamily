import { Cloudinary } from "@cloudinary/url-gen";

let cld: Cloudinary;

const setUpCloudinary = () => {
  cld = new Cloudinary({
    cloud: {
      cloudName: "dq7ionfvn",
    },
  });
};

const cloudinaryUploadWidget = (
  action: (id: string, url: string) => void
): any => {
  const myWidget = (window as any).cloudinary.createUploadWidget(
    {
      cloudName: "dq7ionfvn",
      uploadPreset: "smart-family",
      cropping: true,
    },
    (error: any, result: any) => {
      if (!error && result?.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        console.log("image src", result.info.secure_url);
        action(result.info.public_id, result.info.secure_url);
      }
    }
  );
  return myWidget;
};

export { setUpCloudinary, cld, cloudinaryUploadWidget };
