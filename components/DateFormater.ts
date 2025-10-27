function formatDate(dateString: string) {
  const date = new Date(dateString);

  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();

  // Get ordinal suffix (1st, 2nd, 3rd, 4th…)
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  return `${dayName}, ${day}${suffix} ${monthName}, ${year} by ${hours}:${minutes}${ampm}`;
}

// Example:
// console.log(formatDate("2025-07-09T10:52:49.7043507"));
export default formatDate;