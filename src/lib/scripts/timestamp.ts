export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  const options: object = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleString('en-NZ', options);
}
