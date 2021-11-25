import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CalendarEvent } from "../../types";

interface CalendarState {
  calendarEvents: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
}

const initialState: CalendarState = {
  calendarEvents: [],
  selectedEvent: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarEvents(
      state,
      action: PayloadAction<{ calendarEvents: CalendarEvent[] }>
    ) {
      state.calendarEvents = action.payload.calendarEvents;
    },
    setOneCalendarEventData(
      state,
      action: PayloadAction<{ calendarEvent: CalendarEvent }>
    ) {
      state.selectedEvent = action.payload.calendarEvent;
    },
    addCalendarEvent(
      state,
      action: PayloadAction<{ calendarEvent: CalendarEvent }>
    ) {
      state.calendarEvents = [
        ...state.calendarEvents,
        action.payload.calendarEvent,
      ];
    },
    updateCalendarEvent(
      state,
      action: PayloadAction<{ calendarEvent: CalendarEvent }>
    ) {
      const { calendarEvent } = action.payload;
      const newEvents = [...state.calendarEvents].filter(
        (event) => event._id !== calendarEvent._id
      );

      state.calendarEvents = [...newEvents, calendarEvent];
    },
  },
});

export const calendarActions = calendarSlice.actions;

export default calendarSlice;
