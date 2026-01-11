import { sleep } from './async.util'

describe('sleep', () => {
  it('resolves after the given ms', async () => {
    const start = Date.now()
    await sleep(50)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(50)
  })

  it('resolves to void', async () => {
    const result = await sleep(10)
    expect(result).toBeUndefined()
  })

  it('resolves after given ms multiple times', async () => {
    const start = Date.now()
    await sleep(30)
    await sleep(30)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(60)
  })
})
