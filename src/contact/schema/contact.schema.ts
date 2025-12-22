import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId, HydratedDocument } from 'mongoose'
import { ContactType } from '../contact.types'
import {
  EmailContact,
  EmailContactSchema,
  EmailContactDocument,
} from './email-contact.schema'
import {
  PhoneContact,
  PhoneContactSchema,
  PhoneContactDocument,
} from './phone-contact.schema'
import {
  WebsiteContact,
  WebsiteContactSchema,
  WebsiteContactDocument,
} from './website-contact.schema'
import {
  SocialMediaContact,
  SocialMediaContactSchema,
  SocialMediaContactDocument,
} from './social-media-contact.schema'

@Schema({ discriminatorKey: 'type' })
export class Contact {
  _id!: ObjectId

  @Prop({ required: true })
  type!: ContactType
}

export const ContactSchema = SchemaFactory.createForClass(Contact)

/**
 * Using schema discriminators here. Not because it's strictly necessary,
 * but to learn and demonstrate their usage.
 */
ContactSchema.discriminator(ContactType.EMAIL, EmailContactSchema)
ContactSchema.discriminator(ContactType.PHONE, PhoneContactSchema)
ContactSchema.discriminator(ContactType.WEBSITE, WebsiteContactSchema)
ContactSchema.discriminator(ContactType.SOCIAL_MEDIA, SocialMediaContactSchema)

export type ContactDocument = HydratedDocument<
  EmailContact | PhoneContact | WebsiteContact | SocialMediaContact
>

// Utility discriminator functions
export function isEmailContact(
  doc: ContactDocument,
): doc is EmailContactDocument {
  return doc.type === ContactType.EMAIL
}

export function isPhoneContact(
  doc: ContactDocument,
): doc is PhoneContactDocument {
  return doc.type === ContactType.PHONE
}

export function isWebsiteContact(
  doc: ContactDocument,
): doc is WebsiteContactDocument {
  return doc.type === ContactType.WEBSITE
}

export function isSocialMediaContact(
  doc: ContactDocument,
): doc is SocialMediaContactDocument {
  return doc.type === ContactType.SOCIAL_MEDIA
}
