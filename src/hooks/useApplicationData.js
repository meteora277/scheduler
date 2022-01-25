import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
const { useState, useEffect } = require("react");

export default function useApplicationData() {
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

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayIndex = state.days.findIndex(day => day.name === state.day)
    const days = [...state.days]
    if (days[dayIndex].spots > 0) {
      days[dayIndex].spots -= 1
    }
    
    console.log(days)
    
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState((prev) => ({ ...prev, appointments, days})));
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState((prev) => ({ ...prev, appointments })));
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}
