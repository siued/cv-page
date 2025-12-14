import { Module } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanyController } from './company.controller'
import { CompanySchema } from './company.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
})
export class CompanyModule {}
