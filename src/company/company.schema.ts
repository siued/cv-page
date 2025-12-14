import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'
import { isIso3166Alpha2CountryCode, isValidUrl } from '../util/string.util'

@Schema({ timestamps: true })
export class Company {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name: string

  @Prop({
    required: false,
    validate: isValidUrl,
    type: String,
  })
  website?: string

  @Prop({
    required: true,
  })
  city: string

  @Prop({
    required: true,
    validate: isIso3166Alpha2CountryCode,
  })
  country: string

  _id!: ObjectId
  createdAt!: Date
  updatedAt!: Date
}

export type CompanyDocument = HydratedDocument<Company>
export const CompanySchema = SchemaFactory.createForClass(Company)
