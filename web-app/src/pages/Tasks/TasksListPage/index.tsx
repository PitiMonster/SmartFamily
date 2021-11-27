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
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import classes from "./index.module.scss";

import { useAppSelector, useAppDispatch } from "../../../hooks";
import { useParams } from "react-router-dom";

import taskImagePath from "../../../assets/images/tasksPhoto.jpg";

import ContentLayout from "../../../layout/ContentLayout";
import AddModifyTaskModal from "./components/AddModifyTaskModal";

import { Task as TaskType } from "../../../types";
import {
  setTaskToCheck,
  setTaskTodo,
  setTaskDone,
  removeTask,
  getTasks,
} from "../../../store/tasks/actions";
import { toastSuccess } from "../../../utils/toasts";
import { setStatus } from "../../../store/utils/actions";

interface RenderTaskOptions extends TaskType {
  checked: boolean;
  handleSecondaryAction: () => void;
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
  const dispatch = useAppDispatch();
  const { groupId, id } = useParams<{ groupId: string; id: string }>();
  const status = useAppSelector((state) => state.utils.status);
  const currentUser = useAppSelector((state) => state.user.loggedInUser);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const tasksToCheck = useAppSelector((state) => state.tasks.toCheckTasks);
  const tasksDone = useAppSelector((state) => state.tasks.doneTasks);
  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);
  const [currentAction, setCurrentAction] = useState<
    "setToCheck" | "setTodo" | "setDone" | "create" | "delete" | ""
  >("");

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
    if (status === "success" && currentAction) {
      let toastText = "Success";
      switch (currentAction) {
        case "setToCheck":
          toastText = "Task set to check successfully";
          break;
        case "setTodo":
          toastText = "Task set to do successfully";
          break;
        case "setDone":
          toastText = "Task set to done successfully";
          break;
        case "create":
          toastText = "Task created successfully";
          break;
        case "delete":
          toastText = "Task deleted successfully";
          break;
        default:
          break;
      }
      toastSuccess(toastText);
      setCurrentAction("");
      dispatch(setStatus(null));
    }
  }, [status, dispatch, currentAction]);

  useEffect(() => {
    dispatch(getTasks(groupId, id));
  }, [dispatch, groupId, id]);

  const renderItem = ({
    name,
    createdAt,
    completionDate,
    principal,
    points,
    status,
    checked,
    description,
    handleSecondaryAction,
    onClick,
  }: RenderTaskOptions) => (
    <ListItem
      sx={{ paddingLeft: 0 }}
      secondaryAction={
        <Stack direction="row" alignItems="center">
          {currentUser?.role === "parent" && (status === "todo" || "toCheck") && (
            <IconButton
              onClick={() => handleSecondaryAction()}
              color={status === "todo" ? "error" : "primary"}
            >
              {status === "todo" ? <DeleteIcon /> : <CheckIcon />}
            </IconButton>
          )}
          <IconButton
            aria-label="info"
            title="Info"
            onClick={() => {
              // setSelectedTaskData({
              //   title: "Modify task",
              //   name,
              //   createdAt,
              //   deadline,
              //   points,
              //   description,
              // });
              // setIsAddModifyTaskModal(true);
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
            color={status !== "done" ? "primary" : "info"}
            disabled={status === "done"}
          />
        </ListItemIcon>
        <ListItemText
          id={name}
          primary={name}
          secondary={`${moment(completionDate).format("DD/MM/YYYY, hh:mm")}`}
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
            {currentUser?.role === "parent" && (
              <IconButton
                color="primary"
                onClick={() => {
                  setIsAddModifyTaskModal(true);
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            )}
          </div>
          <div className={classes.lists}>
            <List>
              <TransitionGroup>
                {tasks.map((item) => (
                  <Collapse key={item._id} in={item.status === "todo"}>
                    {renderItem({
                      ...item,
                      checked: false,
                      handleSecondaryAction: () => {
                        dispatch(removeTask(groupId, id, item._id));
                        setCurrentAction("delete");
                      },
                      onClick: () => {
                        if (item.contractor === currentUser?._id) {
                          dispatch(setTaskToCheck(groupId, id, item._id));
                          setCurrentAction("setToCheck");
                        }
                      },
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
            <List>
              <TransitionGroup>
                {tasksToCheck.map((item) => (
                  <Collapse key={item._id} in={item.status === "tocheck"}>
                    {renderItem({
                      ...item,
                      checked: true,
                      handleSecondaryAction: () => {
                        dispatch(setTaskDone(groupId, id, item._id));
                        setCurrentAction("setDone");
                      },
                      onClick: () => {
                        if (currentUser?.role === "parent") {
                          dispatch(setTaskTodo(groupId, id, item._id));
                          setCurrentAction("setTodo");
                        }
                      },
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
            <List>
              <TransitionGroup>
                {tasksDone.map((item) => (
                  <Collapse key={item._id} in={item.status === "done"}>
                    {renderItem({
                      ...item,
                      checked: true,
                      handleSecondaryAction: () => {},
                      onClick: () => {},
                    })}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </div>
        </div>
      </div>
      {isAddModifyTaskModal && (
        <AddModifyTaskModal
          groupId={groupId}
          childId={id}
          {...selectedTaskData}
        />
      )}
    </ContentLayout>
  );
};

export default TaskListPage;
