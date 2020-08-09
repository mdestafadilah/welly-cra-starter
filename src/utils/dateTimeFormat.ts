import { IntlFormatters, FormatDateOptions } from "react-intl";

interface Opts {
  date?: boolean;
  time?: boolean;
  dateConfig?: FormatDateOptions;
  timeConfig?: FormatDateOptions;
}

export default (
  timestamp: number,
  intl: IntlFormatters,
  { date = true, time = true, dateConfig = {}, timeConfig = {} }: Opts = {}
): string => {
  const val = timestamp * 1000;
  const convertedTime = intl.formatTime(val, timeConfig);
  const convertedDate = intl.formatDate(val, dateConfig);
  if (!time) return convertedTime;
  if (!date) return convertedDate;
  return `${convertedDate} ${convertedTime}`;
};
