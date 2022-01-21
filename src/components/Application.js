import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointments";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application() {
  
  const [state, setState] = useState({days:[], day: "Monday", appointments: []})
  
  const setDay = (day) => {
    setState(prev => ({...prev, day}))
  }



  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((all) => {
      const [days, appointments, interviewers] = all
      setState((prev) =>  ({...prev, days: days.data, appointments: Object.values(appointments.data), interviewers: interviewers.data}))
    })
  },[])
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
          <DayList days={state.days} onChange={setDay} value={state.day}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {console.log(state)}
        {console.log(getAppointmentsForDay(state, state.day))}
        {getAppointmentsForDay(state, state.day).map(appointment => {
          return (
            <Appointment 
              key={appointment.id}
              {...appointment}
            />
          )
        }
      )}
      </section>
    </main>
  );
}
