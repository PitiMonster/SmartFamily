import { useState } from "react";
import Calendar from "react-calendar";

import classes from "./index.module.scss";
import "./calendar-styles.scss";

import ContentLayout from "../../../layout/ContentLayout";

const calendarButton = () => {
  return <button className={classes.myCalendarButton} />;
};

const CalendarPage: React.FC = () => {
  const [value, onChange] = useState(new Date());

  return (
    <ContentLayout>
      <div className={classes.container}>
        <div className={classes.info}>
          <p className={classes.selectedDay}>28</p>
          <div className={classes.events}>
            <p className={classes.events__title}>Events</p>
            <ul className={classes.events__list}></ul>
          </div>
        </div>
        <Calendar
          className={classes.calendarContainer}
          onChange={onChange}
          value={value}
          locale="en-GB"
        />
      </div>
    </ContentLayout>
  );
};

export default CalendarPage;
