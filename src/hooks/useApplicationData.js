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

  let spotsFree = (state, day) => {
    return getAppointmentsForDay(state, day).filter(
      (appointment) => appointment.interview === null
    ).length;
  };

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const updateSpots = () => {
    setState((prev) => {
      //string search days array to return index of current day
      const dayIndex = prev.days.findIndex((day) => day.name === prev.day);

      //copy of all days array
      const daysCopy = [...prev.days];

      //copys day that matches the string
      const dayCopy = { ...daysCopy[dayIndex] };

      //assigns it a new remaining spots value
      dayCopy.spots = spotsFree(prev, prev.day);

      //reassigns copied obj to the days array
      daysCopy[dayIndex] = dayCopy;

      return { ...prev, days: daysCopy };
    });
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

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prev) => ({ ...prev, appointments }));
        updateSpots();
      });
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
      .then(() => {
        setState((prev) => ({ ...prev, appointments }));
        updateSpots();
      });
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}
