/**
 * Calculates the difference between two dates in years (as a decimal number).
 * @param startDate
 * @param endDate
 * @returns Difference in years as a decimal number
 */
export function dateDifferenceInYears(startDate: Date, endDate: Date): number {
  const durationMillis = endDate.getTime() - startDate.getTime()
  const yearInMillis = 365 * 24 * 60 * 60 * 1000
  return Number((durationMillis / yearInMillis).toFixed(2))
}
