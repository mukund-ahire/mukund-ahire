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

const formatted = formatter.format(now);

// Example:
// Thursday, 30 July 2026, 09:34:23 pm

const parts = formatted.split(", ");

const replacement = `📅 ${parts[0]}, ${parts[1]} | 🕒 ${parts[2]} IST`;

content = content.replace(
    /<!--START_SECTION:date-->[\s\S]*?<!--END_SECTION:date-->/,
    `<!--START_SECTION:date-->
${replacement}
<!--END_SECTION:date-->`
);

fs.writeFileSync(readme, content);