// функция отображения даты
export function getDate(commentDate) {
  const currentDate = new Date(commentDate);
  let day = currentDate.getDate();
  let trueDay = day < 10 ? "0" + day : day;
  let month = currentDate.getMonth() + 1;
  let trueMonth = month < 10 ? "0" + month : month;
  let year = currentDate.getFullYear().toString().substr(-2);
  let dateEl = `${trueDay}:${trueMonth}:${year}`;
  let currentHourse =
    currentDate.getHours() < 10
      ? "0" + currentDate.getHours()
      : currentDate.getHours();
  let currentMinutes =
    currentDate.getMinutes() < 10
      ? "0" + currentDate.getMinutes()
      : currentDate.getMinutes();
  let currentTime = `${currentHourse}:${currentMinutes} `;
  let currentDateTime = `${dateEl} ${currentTime}`;
  return currentDateTime;
}
