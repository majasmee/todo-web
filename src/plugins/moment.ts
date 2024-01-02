import moment from "moment-timezone";

const $moment = (
  inp?: moment.MomentInput,
  format?: moment.MomentFormatSpecification,
  language?: string,
  strict?: boolean
) => {
  const tz =
    Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || "Asia/Bangkok";
  return moment(inp, format, language, strict).tz(tz);
};

export default $moment;
