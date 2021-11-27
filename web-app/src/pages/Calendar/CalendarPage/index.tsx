import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import classes from "./index.module.scss";
import "./calendar-styles.scss";

import { useHistory } from "react-router-dom";
import { History } from "history";
import { useParams } from "react-router-dom";

import ContentLayout from "../../../layout/ContentLayout";
import ListItem from "../../../components/ListItem";
import EventModal from "./components/AddModifyEventModal";

import { useAppSelector, useAppDispatch } from "../../../hooks";

import { HtmlElements } from "../../../types";
import { getFmailyCalendar } from "../../../store/calendar/actions";

const CalendarPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const calendarEvents = useAppSelector(
    (state) => state.calendar.calendarEvents
  );

  const history = useHistory<History>();
  const { groupId } = useParams<{ groupId: string }>();

  const [isAddModifyEventModal, setIsAddModifyEventModal] =
    useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [value, onChange] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<String>(moment().format("DD"));
  const [selectedMonth, setSelectedMonth] = useState<String>(
    moment().format("MMMM")
  );
  const [events, setEvents] = useState<HtmlElements>([]);

  const isBackdrop = useAppSelector((state) => state.utils.isBackdrop);

  useEffect(() => {
    if (!isBackdrop) {
      setIsAddModifyEventModal(false);
      setSelectedEventId("");
    }
  }, [isBackdrop]);

  useEffect(() => {
    selectedEventId && setIsAddModifyEventModal(true);
  }, [selectedEventId]);

  useEffect(() => {
    dispatch(getFmailyCalendar(groupId));
  }, [groupId, dispatch]);

  useEffect(() => {
    const currDate = moment(value).format("YYYY-MM-DD");
    const selectedDayEvents = calendarEvents.filter((event) => {
      const eventDate = moment(event.date).format("YYYY-MM-DD");
      return eventDate === currDate;
    });
    const newEvents = selectedDayEvents.map((event) => (
      <ListItem
        key={event._id}
        primaryText={event.name}
        trailingText={""}
        onClick={() => setSelectedEventId(event._id)}
      />
    ));
    setEvents(newEvents);
  }, [calendarEvents, value]);

  const onChangeCalendar = (date: Date) => {
    const mDate = moment(date);
    onChange(date);
    setSelectedDay(mDate.format("DD"));
    setSelectedMonth(mDate.format("MMMM"));
  };

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.info}>
          <div className={classes.date}>
            <p className={classes.selectedDay}>{selectedDay}</p>
            <p className={classes.selectedMonth}>{selectedMonth}</p>
          </div>
          <div className={classes.events}>
            <div className={classes.events__label}>
              <p className={classes.events__title}>Events</p>
              <IconButton
                color="primary"
                onClick={() => setIsAddModifyEventModal(true)}
              >
                <AddIcon />
              </IconButton>
            </div>
            <div className={classes.events__listContainer}>
              <ul className={classes.list}>{events}</ul>
            </div>
          </div>
        </div>
        <Calendar
          className={classes.calendarContainer}
          onChange={onChangeCalendar}
          value={value}
          locale="en-GB"
        />
      </div>
      {isAddModifyEventModal && (
        <EventModal id={selectedEventId} initDate={value} />
      )}
    </ContentLayout>
  );
};

export default CalendarPage;
