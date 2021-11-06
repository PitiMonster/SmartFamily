import { useEffect, useState } from "react";

import classes from "./index.module.scss";

import { HtmlElements } from "../../../types";

import ContentLayout from "../../../layout/ContentLayout";
import ChildrenListItem from "./components/ChildrenListItem";

const ChildrenListPage: React.FC = () => {
  const [children, setChildren] = useState<HtmlElements>([]);

  useEffect(() => {
    const data = [
      {
        id: "1234",
        name: "Natalka",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/girl.png",
      },
      {
        id: "12345",
        name: "Igor",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/boy.png",
      },
      {
        id: "1234",
        name: "Natalka",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/girl.png",
      },
      {
        id: "12345",
        name: "Igor",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/boy.png",
      },
      {
        id: "1234",
        name: "Natalka",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/girl.png",
      },
      {
        id: "12345",
        name: "Igor",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/boy.png",
      },
      {
        id: "1234",
        name: "Natalka",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/girl.png",
      },
      {
        id: "12345",
        name: "Igor",
        photo:
          "https://res.cloudinary.com/dq7ionfvn/image/upload/v1636229651/boy.png",
      },
    ];

    const newChildren = data.map((child) => <ChildrenListItem {...child} />);
    setChildren(newChildren);
  }, []);

  return (
    <ContentLayout>
      <div className={classes.container}>
        <p className={classes.title}>Children</p>
        <div className={classes.list}>{children}</div>
      </div>
    </ContentLayout>
  );
};

export default ChildrenListPage;
