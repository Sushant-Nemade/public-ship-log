export function dayKey(date, timeZone = 'Europe/Berlin') {
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(date));
}
export function streak(entries, now = new Date(), timeZone = 'Europe/Berlin') {
  const days = new Set(entries.map(item => dayKey(item.createdAt, timeZone)));
  const today = dayKey(now, timeZone);
  const yesterday = dayKey(new Date(new Date(now).valueOf() - 86400000), timeZone);
  let cursor = days.has(today) ? today : yesterday;
  let count = 0;
  while (days.has(cursor)) { count++; cursor = new Date(`${cursor}T12:00:00Z`); cursor = dayKey(new Date(cursor.valueOf() - 86400000), timeZone); }
  return count;
}
