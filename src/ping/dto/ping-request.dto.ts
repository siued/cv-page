import { IsOptional, IsString, ValidateBy } from 'class-validator'
import { isValidUrl } from '../../util/string.util'
import { ApiProperty } from '@nestjs/swagger'

export class PingRequestDto {
  @IsOptional()
  @IsString()
  @ValidateBy({
    name: 'isValidUrl',
    validator: {
      validate: (value: any) => {
        return isValidUrl(value)
      },
      defaultMessage: () => 'callbackUrl must be a valid URL',
    },
  })
  @ApiProperty({
    example: 'https://example.com/ping-callback',
  })
  callbackUrl?: string
}
