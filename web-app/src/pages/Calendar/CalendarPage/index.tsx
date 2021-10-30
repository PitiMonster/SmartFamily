import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";

import classes from "./index.module.scss";
import "./calendar-styles.scss";

import ContentLayout from "../../../layout/ContentLayout";
import ListItem from "../../../components/ListItem";

const calendarButton = () => {
  return <button className={classes.myCalendarButton} />;
};

const CalendarPage: React.FC = () => {
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

  useEffect(() => {
    const eventsData = [
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
      {
        primaryText: "event 1",
        trailingText: "trailing 1",
        onClick: () => {},
      },
    ];

    const newEvents = eventsData.map((event) => <ListItem {...event} />);
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
            <div className={classes.listContainer}>
              <ul className={classes.events__list}>{events}</ul>
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
    </ContentLayout>
  );
};

export default CalendarPage;
