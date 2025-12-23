import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Patch,
  ValidationPipe,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger'
import { CreateContactDto } from './dto/create-contact.dto'
import { ContactService } from './contact.service'
import { ContactDto } from './dto/contact.dto'
import { ApiContactResponse } from './decorators/api-contact-response.decorator'
import { EmailContactDto } from './dto/email-contact.dto'
import { PhoneContactDto } from './dto/phone-contact.dto'
import { SocialMediaContactDto } from './dto/social-media-contact.dto'
import { WebsiteContactDto } from './dto/website-contact.dto'
import { ContactPaginatedResponseDto } from './dto/contact-paginated-response.dto'
import { ContactQueryDto } from './dto/contact-query.dto'
import { ContactMapper } from './contact.mapper'
import { ApiBadRequestResponse } from '../common/decorators/bad-request.decorator'
import { BearerAuth } from '../common/decorators/bearer-auth-required.decorator'
import { ApiNotFoundResponse } from '../common/decorators/not-found.decorator'
import { ObjectIdValidationPipe } from '../common/validators/object-id.validation-pipe'
import { ApiContactBody } from './decorators/api-contact-body.decorator'
import { ContactUnionValidationPipe } from './pipes/contact-union-validation.pipe'
import { CreateEmailContactDto } from './dto/create-email-contact.dto'
import { CreatePhoneContactDto } from './dto/create-phone-contact.dto'
import { CreateSocialMediaContactDto } from './dto/create-social-media-contact.dto'
import { CreateWebsiteContactDto } from './dto/create-website-contact.dto'

export const CONTACT_TAG_DESCRIPTION =
  'My contact details. This endpoint collection allows CRUD operations on various types of contacts (email, phone, social media, website).'

@ApiTags('Contacts')
@Controller('contacts')
@ApiExtraModels(
  EmailContactDto,
  PhoneContactDto,
  SocialMediaContactDto,
  WebsiteContactDto,
  CreateEmailContactDto,
  CreatePhoneContactDto,
  CreateSocialMediaContactDto,
  CreateWebsiteContactDto,
)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Post()
  @BearerAuth()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiContactBody('Contact create body')
  @ApiContactResponse(201)
  @ApiBadRequestResponse()
  async create(
    @Body(new ContactUnionValidationPipe()) dto: CreateContactDto,
  ): Promise<ContactDto> {
    const doc = await this.contactService.create(dto)
    return ContactMapper.toDto(doc)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact by ID' })
  @ApiContactResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<ContactDto> {
    const doc = await this.contactService.findOne(id)
    return ContactMapper.toDto(doc)
  }

  @Patch(':id')
  @BearerAuth()
  @ApiOperation({ summary: 'Update a contact by ID' })
  @ApiContactBody('Contact update body')
  @ApiContactResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body(new ContactUnionValidationPipe()) dto: CreateContactDto,
  ): Promise<ContactDto> {
    const doc = await this.contactService.update(id, dto)
    return ContactMapper.toDto(doc)
  }

  @Delete(':id')
  @BearerAuth()
  @ApiOperation({ summary: 'Delete a contact by ID' })
  @ApiContactResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<ContactDto> {
    const contact = await this.contactService.remove(id)
    return ContactMapper.toDto(contact)
  }

  @Get()
  @ApiOperation({ summary: 'List all contacts' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of contacts',
    type: ContactPaginatedResponseDto,
  })
  @ApiBadRequestResponse()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: ContactQueryDto,
  ): Promise<ContactPaginatedResponseDto> {
    const { items, total } = await this.contactService.findAll(query)
    return { items: ContactMapper.toDtos(items), total }
  }
}
