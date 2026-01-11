import { AppService } from './app.service'

describe('AppService', () => {
  let service: AppService

  beforeEach(() => {
    service = new AppService()
  })

  it('getHealth returns OK', async () => {
    await expect(service.getHealth()).resolves.toBe('OK')
  })
})
