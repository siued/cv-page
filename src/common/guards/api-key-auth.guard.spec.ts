import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { ApiKeyAuthGuard } from './api-key-auth.guard'

describe('ApiKeyAuthGuard', () => {
  let guard: ApiKeyAuthGuard
  let context: Partial<ExecutionContext>
  const OLD_ENV = process.env

  beforeEach(() => {
    guard = new ApiKeyAuthGuard()
    process.env = { ...OLD_ENV, API_KEY: 'test-key' }
    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {},
        }),
      }),
    } as any
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('should throw if Authorization header is missing', () => {
    expect(() => guard.canActivate(context as ExecutionContext)).toThrow(
      UnauthorizedException,
    )
  })

  it('should throw if Authorization header is invalid', () => {
    ;(context!.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: { authorization: 'Invalid' },
      }),
    })
    expect(() => guard.canActivate(context as ExecutionContext)).toThrow(
      UnauthorizedException,
    )
  })

  it('should throw if API key is invalid', () => {
    ;(context!.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: { authorization: 'Bearer wrong-key' },
      }),
    })
    expect(() => guard.canActivate(context as ExecutionContext)).toThrow(
      UnauthorizedException,
    )
  })

  it('should return true for valid API key', () => {
    ;(context!.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: { authorization: 'Bearer test-key' },
      }),
    })
    expect(guard.canActivate(context as ExecutionContext)).toBe(true)
  })
})
