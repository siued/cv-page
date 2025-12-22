import { InternalServerErrorException } from '@nestjs/common'
import { ContactDto } from './dto/contact.dto'
import {
  ContactDocument,
  isEmailContact,
  isPhoneContact,
  isSocialMediaContact,
  isWebsiteContact,
} from './schema/contact.schema'

export class ContactMapper {
  static toDto(doc: ContactDocument): ContactDto {
    if (isEmailContact(doc)) {
      return {
        _id: doc._id.toString(),
        type: doc.type,
        email: doc.email,
      }
    } else if (isPhoneContact(doc)) {
      return {
        _id: doc._id.toString(),
        type: doc.type,
        phone: doc.phone,
      }
    } else if (isSocialMediaContact(doc)) {
      return {
        _id: doc._id.toString(),
        type: doc.type,
        url: doc.url,
      }
    } else if (isWebsiteContact(doc)) {
      return {
        _id: doc._id.toString(),
        type: doc.type,
        url: doc.url,
      }
    } else
      throw new InternalServerErrorException(
        `Unknown contact type: ${doc.type}`,
      )
  }

  static toDtos(docs: ContactDocument[]): ContactDto[] {
    return docs.map((doc) => this.toDto(doc))
  }
}
