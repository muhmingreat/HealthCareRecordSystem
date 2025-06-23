export function formatDate(timestamp) {
  const date = new Date(timestamp)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
  return formattedDate
}
