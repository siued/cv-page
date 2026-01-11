import { dateDifferenceInYears } from './date.util'

describe('dateDifferenceInMillis', () => {
  it('returns the difference in years (as float) between two dates', () => {
    const start = new Date('2020-01-01')
    const end = new Date('2023-01-01')
    const diff = dateDifferenceInYears(start, end)
    expect(diff).toBeCloseTo(3.0, 1)
  })

  it('returns 0 for the same date', () => {
    const date = new Date('2022-05-05')
    expect(dateDifferenceInYears(date, date)).toBe(0)
  })
})
