// Build a Google Calendar "add event" URL from a local datetime string.
// Times are emitted in UTC (Z) so they land correctly regardless of viewer TZ.
function toCalStamp(localISO) {
  const d = new Date(localISO)
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function googleCalendarUrl({ title, start, end, details = '', location = '' }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toCalStamp(start)}/${toCalStamp(end)}`,
    details,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
