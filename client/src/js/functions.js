export const formatDateFromMilliToDate = time => {
  const updatedDateFormatted = new Date(time * 1).getTime();
  console.log(`Time: ${updatedDateFormatted}`);
  const date = new Date(updatedDateFormatted);
  return date.toString();
};

export const formatDateFromDateToNumber = date => {
  const dateDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const dateTime = `${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}${String(date.getMilliseconds()).padStart(3, '0')}`;
  return parseInt(`${dateDate}${dateTime}`);
}

export const formatMilliToTimeElapsed = time => {
  let ms = time % 1000;
  time = (time - ms) / 1000;
  let secs = time % 60;
  time = (time - secs) / 60;
  let mins = time % 60;
  time = (time - mins) / 60;
  let hrs = time % 24;
  time = (time - mins) / 24;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
};