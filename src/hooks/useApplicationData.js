import axios from "axios";
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
    //gets index of current selected day
    //updates number of spots then updates state
    const dayIndex = state.days.findIndex(day => day.name === state.day)
    const daysCopy = [...state.days]
    const dayCopy = {...daysCopy[dayIndex]}
    if (daysCopy[dayIndex].spots >= 0) {
      dayCopy.spots -= 1
    }
    daysCopy[dayIndex] = dayCopy

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState((prev) => ({ ...prev, appointments, days: daysCopy})));
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
    const dayIndex = state.days.findIndex(day => day.name === state.day)
    const daysCopy = [...state.days]
    const dayCopy = {...daysCopy[dayIndex]}
    if (daysCopy[dayIndex].spots >= 0) {
      dayCopy.spots += 1
    }
    daysCopy[dayIndex] = dayCopy

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState((prev) => ({ ...prev, appointments, days: daysCopy })));
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}
