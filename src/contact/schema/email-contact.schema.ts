import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'
import { ContactType } from '../contact.types'

@Schema()
export class EmailContact {
  _id: ObjectId
  type: ContactType.EMAIL

  @Prop({ required: true })
  email!: string
}

export const EmailContactSchema = SchemaFactory.createForClass(EmailContact)
export type EmailContactDocument = HydratedDocument<EmailContact>
