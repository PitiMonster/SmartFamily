import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";

import classes from "./index.module.scss";
import "./calendar-styles.scss";

import ContentLayout from "../../../layout/ContentLayout";
import ListItem from "../../../components/ListItem";
import EventModal from "./components/AddModifyEventModal";

import { useAppSelector } from "../../../hooks";

const calendarButton = () => {
  return <button className={classes.myCalendarButton} />;
};

const CalendarPage: React.FC = () => {
  const [isAddModifyEventModal, setIsAddModifyEventModal] =
    useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [value, onChange] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<String>(moment().format("DD"));
  const [selectedMonth, setSelectedMonth] = useState<String>(
    moment().format("MMMM")
  );
  const [events, setEvents] = useState<
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >[]
    | undefined
  >([]);

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
    const eventsData = [
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
      {
        id: "idtest",
        primaryText: "event 1",
        trailingText: "trailing 1",
      },
    ];

    const newEvents = eventsData.map((event) => (
      <ListItem {...event} onClick={() => setSelectedEventId(event.id)} />
    ));
    setEvents(newEvents);
  }, []);

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
            <p className={classes.events__title}>Events</p>
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
      {isAddModifyEventModal && <EventModal id={selectedEventId} />}
    </ContentLayout>
  );
};

export default CalendarPage;
