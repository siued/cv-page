import {
  IsOptional,
  IsString,
  IsUrl,
  ValidateBy,
  ValidationArguments,
} from 'class-validator'
import { isIso3166Alpha2CountryCode } from '../../util/string.util'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyDto {
  @IsString()
  @ApiProperty({
    example: 'NASA',
  })
  name: string

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'website must be a valid URL' })
  @ApiProperty({
    required: false,
    description: 'Company website URL. Must be a valid URL',
    example: 'https://www.nasa.gov/',
  })
  website?: string

  @IsString()
  @ApiProperty({
    example: 'Groningen',
  })
  city: string

  @IsString()
  @ValidateBy({
    name: 'isIso3166Alpha2CountryCode',
    validator: {
      validate: (value: any, _args: ValidationArguments) =>
        isIso3166Alpha2CountryCode(value),
      defaultMessage: () => 'country must be a valid ISO 3166-1 alpha-2 code',
    },
  })
  @ApiProperty({
    description: 'Country code in ISO 3166-1 alpha-2 format',
    example: 'NL',
  })
  country: string
}
