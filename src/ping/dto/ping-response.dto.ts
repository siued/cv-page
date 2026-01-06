import { ApiProperty } from '@nestjs/swagger'
import { Equals, IsDate, IsString } from 'class-validator'

export class PongResponseDto {
  @IsString()
  @Equals('pong')
  @ApiProperty({ example: 'pong' })
  message!: 'pong'

  @IsDate()
  @ApiProperty({ example: new Date().toISOString() })
  timestamp!: string
}
