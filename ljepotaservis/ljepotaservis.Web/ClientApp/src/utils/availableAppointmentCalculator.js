import milisecondMinuteConverter from "./milisecondMinuteConverter";

const availableAppointmentCalculator = (
  dayToCalculate,
  employee,
  appointmentDurations
  ) => {
  const dayToCalculateDateFormat = new Date(dayToCalculate);
  const reservationsFiltered = employee.reservations.filter(
    reservation =>{
      const reservationDate = new Date(Date.parse(reservation.timeOfReservation))
      return reservationDate.getFullYear() ===
       dayToCalculateDateFormat.getFullYear() &&
        reservationDate.getMonth() === dayToCalculateDateFormat.getMonth() &&
        reservationDate.getDate() === dayToCalculateDateFormat.getDate()
    }
  );

  const dailyReservations = reservationsFiltered.map(reservation => {
      const timeOfReservationDate = new Date(Date.parse(reservation.timeOfReservation));
      const endOfReservationDate = new Date(Date.parse(reservation.endOfReservation));
    return {
      timeOfReservation: dayToCalculateDateFormat.setHours(timeOfReservationDate.getHours(), timeOfReservationDate.getMinutes()),
      endOfReservation: dayToCalculateDateFormat.setHours(endOfReservationDate.getHours(), endOfReservationDate.getMinutes())
    };
  });

  const startOfShiftDateFormat = new Date(Date.parse(employee.startOfShift));
  const endOfShiftDateFormat = new Date(Date.parse(employee.endOfShift))
  const startOfShift = dayToCalculateDateFormat.setHours(startOfShiftDateFormat.getHours(), startOfShiftDateFormat.getMinutes());
  const endOfShift = dayToCalculateDateFormat.setHours(endOfShiftDateFormat.getHours(), endOfShiftDateFormat.getMinutes());
  
  const durationTotal = appointmentDurations.reduce((accumulator,appointmentDuration) => {
    const appointmentDurationHour = appointmentDuration.slice(0,2) * 1;
    const appoitmentDurationMinutes = appointmentDuration.slice(3,5) * 1;
    return accumulator + appointmentDurationHour * 60 + appoitmentDurationMinutes;
  }, 0);
  
  const appointmentDurationDateTime = dayToCalculateDateFormat.setHours(Math.floor(durationTotal / 60), Math.floor(durationTotal % 60)) - dayToCalculateDateFormat;
  const availabeAppointments = [];
  
  if(dailyReservations.length === 0){
    let freeTimeInMiliSec = endOfShift - startOfShift;
    let accumulator = 0;
    while (
      freeTimeInMiliSec >=
      appointmentDurationDateTime
      ) {
      availabeAppointments.push(startOfShift + accumulator);
      freeTimeInMiliSec -= milisecondMinuteConverter.minsToMillis(15);
      accumulator += milisecondMinuteConverter.minsToMillis(15);
    }
  }

  for (let itterator = 0; itterator < dailyReservations.length; itterator++) {

    if (itterator === dailyReservations.length - 1) {
      let freeTimeInMiliSec =
        endOfShift - dailyReservations[itterator].endOfReservation;
      let accumulator = 0;
      while (
        freeTimeInMiliSec >
        appointmentDurationDateTime
      ) {
        availabeAppointments.push(
          dailyReservations[itterator].endOfReservation + accumulator
        );
        freeTimeInMiliSec -= milisecondMinuteConverter.minsToMillis(15);
        accumulator += milisecondMinuteConverter.minsToMillis(15);
      }
      continue;
    }

    if (itterator === 0) {
      let freeTimeInMiliSec =
        dailyReservations[itterator].timeOfReservation - startOfShift;
      let accumulator = 0;

      while (
        freeTimeInMiliSec >
        appointmentDurationDateTime
      ) {
        availabeAppointments.push(startOfShift + accumulator);
        freeTimeInMiliSec -= milisecondMinuteConverter.minsToMillis(15);
        accumulator += milisecondMinuteConverter.minsToMillis(15);
      }
      continue;
    }

    let freeTimeInMiliSec =
      dailyReservations[itterator].timeOfReservation -
      dailyReservations[itterator - 1].endOfReservation;
    let accumulator = 0;
    while (
      freeTimeInMiliSec >
      appointmentDurationDateTime
    ) {
      availabeAppointments.push(
        dailyReservations[itterator - 1].endOfReservation +
          accumulator
      );
      freeTimeInMiliSec -= milisecondMinuteConverter.minsToMillis(15);
      accumulator += milisecondMinuteConverter.minsToMillis(15);
    }
  }

  return availabeAppointments;
};

export default availableAppointmentCalculator;
