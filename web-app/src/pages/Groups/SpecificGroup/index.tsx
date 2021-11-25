import { useState, useEffect } from "react";

import classes from "./index.module.scss";

import GroupBlock from "../components/GroupBlock";

import { useHistory } from "react-router-dom";
import { History } from "history";
import { useParams } from "react-router-dom";

import ContentLayout from "../../../layout/ContentLayout";

const SpecificGroupPage: React.FC = () => {
  const history = useHistory<History>();
  // const { groupId } = useParams<{ groupId: string }>();

  const [funcBlocks, setFuncBlocks] = useState<
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >[]
    | undefined
  >([]);

  useEffect(() => {
    const data = [
      {
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/calendar.png",
        name: "Calendar",
        onClick: () => {
          history.push(`calendar`);
        },
        isBorder: true,
      },
      {
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/piggy-bank.png",
        name: "Budgets",
        onClick: () => {
          history.push(`budgets/`);
        },
        isBorder: true,
      },
      {
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/shop.png",
        name: "Shopping List",
        onClick: () => {
          history.push(`shopping/`);
        },
        isBorder: true,
      },
      {
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1635345933/SmartFamily/children.png",
        name: "Children",
        onClick: () => {},
        isBorder: true,
      },
    ];

    // TODO if child role then last object photo equal to 'goal'

    const newFuncObjects = data.map((object) => (
      <GroupBlock key={object.name} {...object} />
    ));
    setFuncBlocks(newFuncObjects);
  }, [history]);

  return (
    <ContentLayout>
      <div className={classes.container}>{funcBlocks}</div>
      <p className={classes.attribiution}>
        Icons made by Freepik from www.flaticon.com
      </p>
    </ContentLayout>
  );
};

export default SpecificGroupPage;
