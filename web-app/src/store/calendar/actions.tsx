import api from "../../api/api";
import { AppDispatch } from "..";
import { calendarActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getFmailyCalendar = (familyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/families/${familyId}/calendar`);
      dispatch(
        calendarActions.setCalendarEvents({
          calendarEvents: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET CALENDAR EVENTS ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};

export const getOneCalendarEvent = (familyId: string, eventId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        `/families/${familyId}/calendar/${eventId}`
      );
      dispatch(
        calendarActions.setOneCalendarEventData({
          calendarEvent: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET ONE CALENDAR EVENT ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};

export const addCalendarEvent =
  (familyId: string, name: string, date: Date, description: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(`/families/${familyId}/calendar/`, {
        name,
        date,
        description,
      });
      dispatch(
        calendarActions.addCalendarEvent({
          calendarEvent: response.data.data,
        })
      );
      console.log(response.data.status);
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("CREATE CALENDAR EVENT ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const updateCalendarEvent =
  (
    familyId: string,
    eventId: string,
    name: string,
    date: Date,
    description: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(
        `/families/${familyId}/calendar/${eventId}`,
        {
          name,
          date,
          description,
        }
      );
      dispatch(
        calendarActions.updateCalendarEvent({
          calendarEvent: response.data.data,
        })
      );
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("UPDATE CALENDAR EVENT ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
