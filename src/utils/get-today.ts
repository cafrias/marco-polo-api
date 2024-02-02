export function getToday() {
  const result = new Date();
  result.setHours(0, 0, 0, 0);
  return result;
}
