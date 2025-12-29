export function dateDifferenceInMillis(startDate: Date, endDate: Date): number {
  const durationMillis = endDate.getTime() - startDate.getTime()
  const yearInMillis = 365 * 24 * 60 * 60 * 1000
  return Number((durationMillis / yearInMillis).toFixed(2))
}
