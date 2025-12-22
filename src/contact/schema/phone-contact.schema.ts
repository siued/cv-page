import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'
import { ContactType } from '../contact.types'

@Schema()
export class PhoneContact {
  _id: ObjectId
  type: ContactType.PHONE

  @Prop({ required: true })
  phone!: string
}

export const PhoneContactSchema = SchemaFactory.createForClass(PhoneContact)
export type PhoneContactDocument = HydratedDocument<PhoneContact>
