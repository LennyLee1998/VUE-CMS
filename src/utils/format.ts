import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
export function formatTime(time: string, formatType = "YYYY/MM/DD HH:mm:ss") {
  dayjs.extend(utc);
  return dayjs.utc(time).local().format(formatType);
}
