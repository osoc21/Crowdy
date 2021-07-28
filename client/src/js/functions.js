export const formatDateFromMilliToDate = time => {
  const updatedDateFormatted = new Date(time * 1).getTime();
  console.log(`Time: ${updatedDateFormatted}`);
  const date = new Date(updatedDateFormatted);
  return date.toString();
};

export const formatDateFromDateToNumber = time => {
  const date = new Date(time);
  const dateDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  return dateDate;
  //const dateTime = `${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}${String(date.getMilliseconds()).padStart(3, '0')}`;
  //return parseInt(`${dateDate}${dateTime}`);
}

export const getTimeElapsedInMilli = time => {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  return currentTime - parseInt(time);
};

export const formatMilliToTimeElapsed = time => {
  let ms = time % 1000;
  time = (time - ms) / 1000;
  let secs = time % 60;
  time = (time - secs) / 60;
  let mins = time % 60;
  time = (time - mins) / 60;
  let hrs = time % 24;
  time = Math.floor((time - mins) / 24);

  if (time > 0) return `${time} days`;
  else if (hrs) return `${hrs} hours`;
  else if (mins) return `${mins} minutes`;
  else return `${secs} seconds`;

  //return hrs + ':' + mins + ':' + secs + '.' + ms;
};

// Calculating the average from an array of votes
export const getAverageFromVotes = votes => {
  const values = votes.map(vote => vote.vote_value);
  let result = 0;
  values.forEach(value => {
    result += parseInt(value);
  })
  if (values.length) result /= values.length;
  return result;
};

// Getting all the recent reports
export const getRecentVotes = (votes, minutes = 60) => {
  const time = 1000 * 60 * minutes;
  const result = votes.filter(vote => getTimeElapsedInMilli(vote.updatedAt) <= time);
  return result;
};