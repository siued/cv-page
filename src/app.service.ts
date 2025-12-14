import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import mongoose from 'mongoose'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  async getHealth(): Promise<string> {
    if (
      mongoose.connection.readyState !== mongoose.ConnectionStates.connected
    ) {
      this.logger.error('Failed when checking database connection!')
      throw new ServiceUnavailableException('Database connection failed!')
    }
    try {
      await mongoose.connection.db?.admin().ping({ maxTimeMS: 1000 })
      return 'OK'
    } catch (error) {
      this.logger.error('Database connection failed', error)
      throw new ServiceUnavailableException('Database is not available')
    }
  }
}
