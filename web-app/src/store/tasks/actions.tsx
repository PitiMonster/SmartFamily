import api from "../../api/api";
import { AppDispatch } from "..";
import { tasksActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getTasks =
  (familyId: string, childId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        `/families/${familyId}/children/${childId}/tasks/`
      );
      console.log(response, "tasks");

      dispatch(
        tasksActions.setTasks({
          tasks: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET TASKS ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const createTask =
  (
    familyId: string,
    childId: string,
    name: string,
    completionDate: Date,
    points: string,
    description: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(
        `/families/${familyId}/children/${childId}/tasks/`,
        {
          name,
          completionDate,
          points,
          description,
        }
      );
      dispatch(tasksActions.addTodoTask({ task: response.data.data }));
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("CREATE TASK ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const setTaskToCheck =
  (familyId: string, childId: string, taskId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(
        `/families/${familyId}/children/${childId}/tasks/${taskId}`
      );
      dispatch(tasksActions.setTaskToCheck({ task: response.data.data }));
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("SET TASK TO CHECK ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
export const setTaskTodo =
  (familyId: string, childId: string, taskId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(
        `/families/${familyId}/children/${childId}/tasks/${taskId}/response/todo`
      );
      dispatch(tasksActions.setTaskTodo({ task: response.data.data }));
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("SET TASK TODO ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
export const setTaskDone =
  (familyId: string, childId: string, taskId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(
        `/families/${familyId}/children/${childId}/tasks/${taskId}/response/done`
      );
      dispatch(tasksActions.setTaskDone({ task: response.data.data }));
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("SET TASK DONE ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
export const removeTask =
  (familyId: string, childId: string, taskId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.delete(
        `/families/${familyId}/children/${childId}/tasks/${taskId}`
      );
      dispatch(tasksActions.removeTask({ taskId }));
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("SET TASK DONE ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
