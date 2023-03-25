function HandleTimeDiff(time: number = 0) {
  const newTime = new Date(Date.now()).getTime();
  let years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds,
    diff = Math.abs((newTime - time) / 10000);

  years = Math.floor(diff / (365 * 60 * 60 * 24));
  months = Math.floor(
    (diff - years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24)
  );
  days = Math.floor(
    (diff - years * 365 * 60 * 60 * 24 - months * 30 * 60 * 60 * 24) /
      (60 * 60 * 24)
  );
  hours = Math.floor(
    (diff -
      years * 365 * 60 * 60 * 24 -
      months * 30 * 60 * 60 * 24 -
      days * 60 * 60 * 24) /
      (60 * 60)
  );
  minutes = Math.floor(
    (diff -
      years * 365 * 60 * 60 * 24 -
      months * 30 * 60 * 60 * 24 -
      days * 60 * 60 * 24 -
      hours * 60 * 60) /
      60
  );
  seconds = Math.floor(
    diff -
      years * 365 * 60 * 60 * 24 -
      months * 30 * 60 * 60 * 24 -
      days * 60 * 60 * 24 -
      hours * 60 * 60 -
      minutes * 60
  );

  if (years) return `${years} năm trước`;
  if (months) return `${months} tháng trước`;
  if (days) return `${days} ngày trước`;
  if (hours) return `${hours} giờ trước`;
  if (minutes) return `${minutes} phút trước`;
  if (seconds) return `${seconds}  giây trước`;
  return "Vừa xong";
}
export default HandleTimeDiff;
