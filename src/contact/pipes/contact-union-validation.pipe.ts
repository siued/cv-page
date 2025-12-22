import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { CreateContactDto } from '../dto/create-contact.dto'
import { CreateEmailContactDto } from '../dto/create-email-contact.dto'
import { CreatePhoneContactDto } from '../dto/create-phone-contact.dto'
import { CreateSocialMediaContactDto } from '../dto/create-social-media-contact.dto'
import { CreateWebsiteContactDto } from '../dto/create-website-contact.dto'

const DTO_CLASSES: ClassConstructor<CreateContactDto>[] = [
  CreateEmailContactDto,
  CreatePhoneContactDto,
  CreateSocialMediaContactDto,
  CreateWebsiteContactDto,
]

@Injectable()
export class ContactUnionValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    const errors = []
    for (const DtoClass of DTO_CLASSES) {
      console.log('Trying validation against:', DtoClass.name)
      const instance = plainToInstance(DtoClass, value)
      const validationErrors = validateSync(instance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      })
      if (validationErrors.length === 0) {
        return instance
      }
      errors.push(validationErrors)
    }
    throw new BadRequestException({
      message: 'Body does not match any allowed contact type',
      errors,
    })
  }
}
