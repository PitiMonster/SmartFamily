import { useEffect, useState } from "react";

import classes from "./index.module.scss";

import { HtmlElements } from "../../../types";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import { useParams } from "react-router-dom";

import ContentLayout from "../../../layout/ContentLayout";
import ChildrenListItem from "./components/ChildrenListItem";
import { getFamilyChildren } from "../../../store/children/actions";

const ChildrenListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const childrenList = useAppSelector((state) => state.children.childrenList);
  const { groupId } = useParams<{ groupId: string }>();

  const [children, setChildren] = useState<HtmlElements>([]);

  useEffect(() => {
    dispatch(getFamilyChildren(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    const newChildren = childrenList.map((child) => (
      <ChildrenListItem key={child._id} {...child} />
    ));
    setChildren(newChildren);
  }, [childrenList]);

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
