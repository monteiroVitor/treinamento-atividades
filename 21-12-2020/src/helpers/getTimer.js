const getCentesimos = (centesimos) => `0${centesimos % 100}`.slice(-2);
const getSeconds = (seconds) => `0${seconds % 60}`.slice(-2);
const getMinutes = (minutes) => `0${minutes % 60}`.slice(-2);
const getHours = (hours) => `0${hours % 24}`.slice(-2);
const fullTimer = (centesimos, seconds, minutes, hours) => {
  return `${getHours(hours)}:${getMinutes(minutes)}:${getSeconds(
    seconds
  )}:${getCentesimos(centesimos)}`;
};

export { getCentesimos, getSeconds, getMinutes, getHours, fullTimer };
