export const getAppointmentsForDay = (state, appointmentDay) => {

  //matches selected day to day obj in state and returns an array of appointments on selected day
  let filteredByAppointmentDay = state.days.filter(
    (day) => day.name === appointmentDay
  );

  if (filteredByAppointmentDay.length === 0) {
    return [];
  } else {
    let appointmentsOnFilteredDay =
      filteredByAppointmentDay[0].appointments.map((appointment) => {
        return state.appointments[appointment];
      });
    return appointmentsOnFilteredDay;
  }
};

export const getInterview = (state, interview) => {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  } else {
    return null;
  }
};

export const getInterviewersForDay = (state, filterDay) => {

  //return an array of interviews. matches id's of selected day with an obj containing all interviewers
  let filteredDay = state.days.filter((day) => day.name === filterDay);

  if (filteredDay.length === 0) {
    return [];
  } else {
    const interviewers = filteredDay[0].interviewers;
    let availableInterviwers = interviewers.map((interviewer) => {
      return state.interviewers[interviewer];
    });
    return availableInterviwers;
  }
};

export const getLastAppointmentDivider = (state, day) => {
  let appointments = getAppointmentsForDay(state, day)
  
  let lastAppointmentTime = appointments[appointments.length - 1].time
  //remove pm from string
  let time = Number(lastAppointmentTime.replace("pm", ""))

  return time + 1
};
