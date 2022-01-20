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
