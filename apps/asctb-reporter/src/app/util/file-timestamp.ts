/** Tiny helper to get a timestamp that can be put in a file name */
export function createFileNameTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth()}`.padStart(2, '0');
  const day = `${now.getDay()}`.padStart(2, '0');
  const hours = `${now.getHours() % 12}`.padStart(2, '0');
  const minutes = now.getMinutes();
  return `${year}.${month}.${day}_${hours}.${minutes}`;
}
