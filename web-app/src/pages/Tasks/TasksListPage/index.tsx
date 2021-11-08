import { useState, useEffect } from "react";
import moment from "moment";

import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import classes from "./index.module.scss";

import { useAppSelector } from "../../../hooks";

import taskImagePath from "../../../assets/images/tasksPhoto.jpg";

import ContentLayout from "../../../layout/ContentLayout";
import AddModifyTaskModal from "./components/AddModifyTaskModal";

interface RenderTaskOptions {
  name: string;
  parentUsername: string;
  createdAt: Date;
  deadline: Date;
  points: number;
  checked: boolean;
  description: string;
  handleRemoveItem: (name: string) => void;
  onClick: () => void;
}

interface SelectedTaskData {
  title: string;
  name: string;
  createdAt: Date;
  deadline: Date;
  points: number;
  description: string;
}

const TaskListPage: React.FC = () => {
  const [selectedTaskData, setSelectedTaskData] = useState<SelectedTaskData>({
    title: "Add task",
    name: "",
    createdAt: new Date(Date.now()),
    deadline: new Date(Date.now()),
    points: 0,
    description: "",
  });
  const [isAddModifyTaskModal, setIsAddModifyTaskModal] =
    useState<boolean>(false);
  const [shoppingList, setShoppingList] = useState<
    {
      name: string;
      parentUsername: string;
      createdAt: Date;
      deadline: Date;
      points: number;
      checked: boolean;
      description: string;
    }[]
  >([]);
  const [checkedShoppingList, setCheckedShoppingList] = useState<
    {
      name: string;
      parentUsername: string;
      createdAt: Date;
      deadline: Date;
      points: number;
      checked: boolean;
      description: string;
    }[]
  >([]);

  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddModifyTaskModal(false);
      setSelectedTaskData({
        title: "Add task",
        name: "",
        createdAt: new Date(Date.now()),
        deadline: new Date(Date.now()),
        points: 0,
        description: "",
      });
    }
  }, [isBackdrop]);

  useEffect(() => {
    const items = [
      {
        name: "Do homework",
        parentUsername: "cooolMummy",
        createdAt: new Date(Date.now()),
        deadline: new Date(Date.now()),
        points: 25,
        checked: false,
        description: "Tem desc",
      },
      {
        name: "Do homework",
        parentUsername: "cooolMummy",
        createdAt: new Date(Date.now()),
        deadline: new Date(Date.now()),
        points: 25,
        checked: false,
        description: "Tem desc",
      },
      {
        name: "Do homework",
        parentUsername: "cooolMummy",
        createdAt: new Date(Date.now()),
        deadline: new Date(Date.now()),
        points: 25,
        checked: false,
        description: "Tem desc",
      },
      {
        name: "Do homework",
        parentUsername: "cooolMummy",
        createdAt: new Date(Date.now()),
        deadline: new Date(Date.now()),
        points: 25,
        checked: false,
        description: "Tem desc",
      },
    ];
    setShoppingList(items);
  }, []);

  const renderItem = ({
    name,
    createdAt,
    deadline,
    parentUsername,
    points,
    checked,
    description,
    handleRemoveItem,
    onClick,
  }: RenderTaskOptions) => (
    <ListItem
      sx={{ paddingLeft: 0 }}
      secondaryAction={
        <Stack direction="row" alignItems="center">
          {/* <ListItemText
            className={classes.deadline}
            primary={`${moment(deadline).format("DD/MM/YYYY, hh:mm")}`}
            sx={{ paddingRight: "1rem" }}
          /> */}
          <IconButton
            aria-label="delete"
            title="Delete"
            onClick={() => handleRemoveItem(name)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="info"
            title="Info"
            onClick={() => {
              setSelectedTaskData({
                title: "Modify task",
                name,
                createdAt,
                deadline,
                points,
                description,
              });
              setIsAddModifyTaskModal(true);
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemButton role={undefined} onClick={onClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": name }}
            color={checked ? "primary" : "primary"}
          />
        </ListItemIcon>
        <ListItemText
          id={name}
          primary={name}
          secondary={`${moment(deadline).format("DD/MM/YYYY, hh:mm")}`}
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.container__image}>
          <img className={classes.image} src={taskImagePath} alt="task" />
          <p className={classes.attribution}>
            Idea vector created by stories - www.freepik.com
          </p>
        </div>
        <div className={classes.container__list}>
          <div className={classes.header}>
            <p className={classes.header__title}>Tasks</p>
            <IconButton
              color="primary"
              onClick={() => {
                setIsAddModifyTaskModal(true);
              }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={classes.lists}>
            <List>
              <TransitionGroup>
                {shoppingList.map((item) => (
                  <Collapse in={item.checked}>
                    {renderItem({
                      ...item,
                      handleRemoveItem: (name) => {},
                      onClick: () => {
                        setShoppingList((prev) => {
                          const firstItem = prev[0];
                          firstItem.checked = !firstItem.checked;
                          const newList = prev.slice(1);
                          setCheckedShoppingList((prev) => [
                            firstItem,
                            ...prev,
                          ]);
                          return [...newList];
                        });
                      },
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
            <List>
              <TransitionGroup>
                {checkedShoppingList.map((item) => (
                  <Collapse in={item.checked}>
                    {renderItem({
                      ...item,
                      handleRemoveItem: (name) => {},
                      onClick: () => {
                        setCheckedShoppingList((prev) => {
                          const firstItem = prev[0];
                          firstItem.checked = !firstItem.checked;
                          const newList = prev.slice(1);
                          setShoppingList((prev) => [firstItem, ...prev]);
                          return [...newList];
                        });
                      },
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </div>
        </div>
      </div>
      {isAddModifyTaskModal && <AddModifyTaskModal {...selectedTaskData} />}
    </ContentLayout>
  );
};

export default TaskListPage;
