import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'
import { ContactType } from '../contact.types'

@Schema()
export class SocialMediaContact {
  _id: ObjectId
  type: ContactType.SOCIAL_MEDIA

  @Prop({ required: true })
  url!: string
}

export const SocialMediaContactSchema =
  SchemaFactory.createForClass(SocialMediaContact)
export type SocialMediaContactDocument = HydratedDocument<SocialMediaContact>
