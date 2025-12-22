import { Module } from '@nestjs/common'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ContactSchema } from './schema/contact.schema'

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
  ],
})
export class ContactModule {}
