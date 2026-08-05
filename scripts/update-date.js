const fs = require("fs");
const readme = "README.md";
let content = fs.readFileSync(readme, "utf8");

const now = new Date();

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

// formatToParts is stable across Node/ICU versions -- doesn't depend on
// whether the locale renders "date, time" or "date at time".
const parts = formatter.formatToParts(now).reduce((acc, part) => {
  acc[part.type] = part.value;
  return acc;
}, {});

const datePart = `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year}`;
const timePart = `${parts.hour}:${parts.minute}:${parts.second} ${parts.dayPeriod.toLowerCase()}`;

const replacement = `📅 ${datePart} | 🕒 ${timePart} IST`;

content = content.replace(
  /<!--START_SECTION:date-->[\s\S]*?<!--END_SECTION:date-->/,
  `<!--START_SECTION:date-->\n${replacement}\n<!--END_SECTION:date-->`
);

fs.writeFileSync(readme, content);
