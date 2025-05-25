export function getUTCOffset(timezone) {
	const now = new Date();
	const options = { timeZone: timezone, timeZoneName: "shortOffset" };
	const formatter = new Intl.DateTimeFormat([], options);
	const parts = formatter.formatToParts(now);
	const offsetPart = parts.find((part) => part.type === "timeZoneName");
	if (!offsetPart) {
		return null;
	}
	const gmtString = offsetPart.value; // e.g. "GMT-1"
	const match = gmtString.match(/GMT([+-]?)(\d{1,2})(?::(\d{2}))?/);
	if (!match) return null;

	const sign = match[1] || "+";
	const hours = match[2].padStart(2, "0");
	const minutes = match[3] || "00";
	return `UTC ${sign}${hours}:${minutes}`;
}
