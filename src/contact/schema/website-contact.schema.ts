import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'
import { ContactType } from '../contact.types'

@Schema()
export class WebsiteContact {
  _id: ObjectId
  type: ContactType.WEBSITE

  @Prop({ required: true })
  url!: string
}

export const WebsiteContactSchema = SchemaFactory.createForClass(WebsiteContact)
export type WebsiteContactDocument = HydratedDocument<WebsiteContact>
