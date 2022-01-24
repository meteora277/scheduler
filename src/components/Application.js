import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointments";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: [],
    interviewers: {}
  });

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    });
  }, []);

  const schedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    const interviewers = getInterviewersForDay(state, state.day)
    console.log(interviewers)
    return <Appointment key={appointment.id} {...appointment} {...interview} interviewers={interviewers}/>;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} onChange={setDay} value={state.day} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule} 
        <Appointment time="5pm"/>
        </section>
    </main>
  );
}
