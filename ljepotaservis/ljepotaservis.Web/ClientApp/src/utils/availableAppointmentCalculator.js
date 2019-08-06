import milisecondMinuteConverter from "./milisecondMinuteConverter";

const availableAppointmentCalculator = (
  dayToCalculate,
  employee,
  appointmentDuration
) => {
  const dailyReservations = employee.reservations.filter(
    reservation =>
      reservation.timeOfReservation.getFullYear() ===
        dayToCalculate.getFullYear() &&
      reservation.timeOfReservation.getMonth() === dayToCalculate.getMonth() &&
      reservation.timeOfReservation.getDate() === dayToCalculate.getDate()
  );
  const startOfShift = dayToCalculate.setHours(employee.startOfShift, 0);
  const endOfShift = dayToCalculate.setHours(employee.endOfShift, 0);

  const availabeAppointments = [];

  for (let itterator = 0; itterator < dailyReservations.length; itterator++) {
    if (itterator === 0) {
      let freeTimeInMiliSec =
        dailyReservations[itterator].timeOfReservation - startOfShift;
      let accumulator = 0;
      while (
        freeTimeInMiliSec >=
        milisecondMinuteConverter.minsToMillis(appointmentDuration)
      ) {
        availabeAppointments.push(startOfShift + accumulator);
        freeTimeInMiliSec -= milisecondMinuteConverter.minsToMillis(15);
        accumulator += milisecondMinuteConverter.minsToMillis(15);
      }
      continue;
    }

    if (itterator === dailyReservations.length - 1) {
      let freeTimeInMiliSec =
        endOfShift - dailyReservations[itterator].endOfReservation;
      let accumulator = 0;
      while (
        freeTimeInMiliSec >=
        milisecondMinuteConverter.minsToMillis(appointmentDuration)
      ) {
        availabeAppointments.push(
          dailyReservations[itterator].endOfReservation.getTime() + accumulator
        );
        freeTimeInMiliSec -= milisecondMinuteConverter.minsToMillis(15);
        accumulator += milisecondMinuteConverter.minsToMillis(15);
      }
    }
    let freeTimeInMiliSec =
      dailyReservations[itterator].timeOfReservation -
      dailyReservations[itterator - 1].endOfReservation;
    let accumulator = 0;
    while (
      freeTimeInMiliSec >=
      milisecondMinuteConverter.minsToMillis(appointmentDuration)
    ) {
      console.log(
        new Date(
          dailyReservations[itterator - 1].endOfReservation.getTime() +
            accumulator
        )
      );
      availabeAppointments.push(
        dailyReservations[itterator - 1].endOfReservation.getTime() +
          accumulator
      );
      freeTimeInMiliSec -= milisecondMinuteConverter.minsToMillis(15);
      accumulator += milisecondMinuteConverter.minsToMillis(15);
    }
  }

  return availabeAppointments;
};

export default availableAppointmentCalculator;
