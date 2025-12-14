import { IsString, IsOptional, IsUrl, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CompanyDto {
  @ApiProperty({ example: '65f1c2e4b7e6a2d1f8c9a123' })
  @IsString()
  _id!: string

  @ApiProperty({ example: 'NASA' })
  @IsString()
  name!: string

  @ApiProperty({ example: 'https://nasa.gov', required: false })
  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'website must be a valid URL' })
  website?: string

  @ApiProperty({ example: 'Groningen' })
  @IsString()
  city!: string

  @ApiProperty({
    example: 'NL',
    description: 'Country code in ISO 3166-1 alpha-2 format',
  })
  @IsString()
  country!: string

  @ApiProperty({ example: '2025-12-13T12:00:00.000Z' })
  @IsDateString()
  createdAt!: Date

  @ApiProperty({ example: '2025-12-13T12:00:00.000Z' })
  @IsDateString()
  updatedAt!: Date
}
