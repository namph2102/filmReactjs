import moment from "moment";
const timeSetTing: any = {
  months: "tháng",
  month: "tháng",
  years: "năm",
  year: "năm",
  minute: "phút",
  minutes: "phút",
  day: "ngày",
  days: "ngày",
  hours: "giờ",
  hour: "giờ",
  second: "giây",
  seconds: "giây",
};
function HandleTimeDiff(timestamp: any) {
  let result: any = moment(timestamp).fromNow();
  if (result.includes("a few seconds ago")) return "vài giây trước";
  if (result[1] === "n") {
    result = result.replace("an", "1");
  } else if (result[0] === "a") {
    result = result.replace("a", "1");
  }

  result = result.replace("ago", "trước");
  result = result.split(" ");

  if (timeSetTing[result[1]]) {
    result[1] = timeSetTing[result[1]];
  }
  return result.join(" ");
}
export default HandleTimeDiff;
