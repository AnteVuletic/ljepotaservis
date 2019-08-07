const millisToMinutes = millis => {
  var minutes = Math.floor(millis / 60000);

  return minutes;
};

const minsToMillis = mins => {
  var miliseconds = mins * 60000;

  return miliseconds;
};

export default { millisToMinutes, minsToMillis };
