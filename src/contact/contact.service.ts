import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Contact, ContactDocument } from './schema/contact.schema'
import { CreateContactDto } from './dto/create-contact.dto'
import { ContactQueryDto } from './dto/contact-query.dto'

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  create(createContactDto: CreateContactDto): Promise<ContactDocument> {
    return this.contactModel.create(createContactDto)
  }

  async findAll(
    options?: ContactQueryDto,
  ): Promise<{ items: ContactDocument[]; total: number }> {
    const { offset = 0, limit = 10, type } = options ?? {}

    const filter: any = {}
    if (type) filter.type = type

    const [items, total] = await Promise.all([
      this.contactModel.find(filter).skip(offset).limit(limit),
      this.contactModel.countDocuments(filter),
    ])
    return { items, total }
  }

  async findOne(id: ObjectId | string): Promise<ContactDocument> {
    const contact = await this.contactModel.findById(id)
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`)
    }
    return contact
  }

  async update(
    id: ObjectId | string,
    updateContactDto: CreateContactDto,
  ): Promise<ContactDocument> {
    const contact = await this.contactModel.findByIdAndUpdate(
      id,
      updateContactDto,
      { new: true },
    )
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`)
    }
    return contact
  }

  async remove(id: ObjectId | string): Promise<ContactDocument> {
    const contact = await this.contactModel.findByIdAndDelete(id)
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`)
    }
    return contact
  }
}
