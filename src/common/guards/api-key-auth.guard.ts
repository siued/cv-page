import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers['authorization']
    const apiKey = process.env.API_KEY

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header')
    }

    const token = authHeader.split(' ')[1]
    if (token !== apiKey) {
      throw new UnauthorizedException('Invalid API key')
    }

    return true
  }
}
