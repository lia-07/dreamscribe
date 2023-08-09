export function formatTimestamp(timestamp: number) {
  // Create a new date object based on the UNIX timestamp provided.
  const date = new Date(timestamp);

  // The options for the 'date.toLocaleString' function to use. This
  // configuration outputs only dates (without the time) in a dd mmm yyyy format
  // (i.e. 9 Aug 2023)
  const options: object = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return date.toLocaleString('en-NZ', options);
}
