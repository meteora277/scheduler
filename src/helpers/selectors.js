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

export const getInterviewersForDay = (state, day) => {
  const interviewers = state.days.interviewers;

  if (interviewers.length === 0) {
    return [];
  } else {
    interviewers.map((interviewer) => {
      return state.interviewers[interviewer];
    });
  }
};
