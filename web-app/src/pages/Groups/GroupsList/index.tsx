import { useEffect, useState } from "react";

import classes from "./index.module.scss";

import GroupBlock from "../components/GroupBlock";
import ContentLayout from "../../../layout/ContentLayout";

const GroupsListPage: React.FC = () => {
  const [groupBlocks, setGroupBlocks] = useState<
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >[]
    | undefined
  >([]);

  useEffect(() => {
    const groups = [
      {
        name: "Grupa 1",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/scary-faces.jpg",
        onClick: () => {},
      },
      {
        name: "Grupa 2",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/lovely-cat.jpg",
        onClick: () => {},
      },
      {
        name: "Grupa 3",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/circus-astronaut.jpg",
        onClick: () => {},
      },
      {
        name: "Grupa 4",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/dab-unicorn.jpg",
        onClick: () => {},
      },
      {
        name: "Grupa 5",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/disco-cat.jpg",
        onClick: () => {},
      },
      {
        name: "Utwórz grupę",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635284961/SmartFamily/GroupPhotos/new-group.jpg",
        onClick: () => {},
      },
    ];

    const newBlockGroups = groups.map((group, index) => (
      <GroupBlock key={index} {...group} />
    ));

    setGroupBlocks(newBlockGroups);
  }, []);

  return (
    <ContentLayout>
      <div className={classes.container}>{groupBlocks}</div>;
      <a
        className={classes.attribiution}
        href="https://www.freepik.com/vectors/logo"
      >
        Logo vector created by catalyststuff - www.freepik.com
      </a>
    </ContentLayout>
  );
};

export default GroupsListPage;
