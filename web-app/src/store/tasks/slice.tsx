import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task as TaskType } from "../../types";

interface TasksState {
  tasks: TaskType[];
  toCheckTasks: TaskType[];
  doneTasks: TaskType[];
}

const initialState: TasksState = {
  tasks: [],
  toCheckTasks: [],
  doneTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<{ tasks: TaskType[] }>) {
      const tasks = action.payload.tasks;
      const newTasks = [];
      const newToCheckTasks = [];
      const newDoneTasks = [];
      for (const task of tasks) {
        if (task.status === "todo") newTasks.push(task);
        else if (task.status === "done") newDoneTasks.push(task);
        else if (task.status === "tocheck") newToCheckTasks.push(task);
      }
      state.tasks = newTasks;
      state.toCheckTasks = newToCheckTasks;
      state.doneTasks = newDoneTasks;
    },
    addTodoTask(state, action: PayloadAction<{ task: TaskType }>) {
      state.tasks = [action.payload.task, ...state.tasks];
    },
    setTaskToCheck(state, action: PayloadAction<{ task: TaskType }>) {
      const { task } = action.payload;
      state.tasks = [...state.tasks.filter((item) => item._id !== task._id)];
      state.toCheckTasks = [task, ...state.toCheckTasks];
    },
    setTaskTodo(state, action: PayloadAction<{ task: TaskType }>) {
      const { task } = action.payload;
      state.toCheckTasks = [
        ...state.toCheckTasks.filter((item) => item._id !== task._id),
      ];
      state.tasks = [task, ...state.tasks];
    },
    setTaskDone(state, action: PayloadAction<{ task: TaskType }>) {
      const { task } = action.payload;
      state.toCheckTasks = [
        ...state.toCheckTasks.filter((item) => item._id !== task._id),
      ];
      state.doneTasks = [task, ...state.doneTasks];
    },
    removeTask(state, action: PayloadAction<{ taskId: string }>) {
      const { taskId } = action.payload;
      state.tasks = state.tasks.filter((item) => item._id !== taskId);
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
