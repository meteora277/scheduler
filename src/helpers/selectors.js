export const getAppointmentsForDay = (state, appointmentDay) => {
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

  //filter appointments array by given day 
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
  //remove am/pm from string
  let time = Number(lastAppointmentTime.replace("pm", ""))

  return time + 1
};
