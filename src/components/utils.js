export const getTimeSince = (time) => {
  let timeAgo = "";

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const MONTH = DAY * 30;
  const YEAR = DAY * 365;

  let diffInMillis = (new Date().valueOf()) - (new Date(time).valueOf());
  if (diffInMillis < MINUTE) {
    timeAgo = Math.round(diffInMillis / SECOND) + " seconds"
  } else if (diffInMillis < HOUR) {
    timeAgo = Math.round(diffInMillis / MINUTE) + " minutes and " + Math.round((diffInMillis % MINUTE) / SECOND) + " seconds"
  } else if (diffInMillis < DAY) {
    timeAgo = Math.round(diffInMillis / HOUR) + " hours and " + Math.round((diffInMillis % HOUR) / MINUTE) + " minutes"
  } else if (diffInMillis < MONTH) {
    timeAgo = Math.round(diffInMillis / DAY) + " days and " + Math.round((diffInMillis % DAY) / HOUR) + " hours"
  } else if (diffInMillis < YEAR) {
    timeAgo = Math.round(diffInMillis / MONTH) + " months and " + Math.round((diffInMillis % MONTH) / DAY) + " days"
  } else {
    timeAgo = Math.round(diffInMillis / YEAR) + " years and " + Math.round((diffInMillis % YEAR) / MONTH) + " months"
  }
  return timeAgo
};
