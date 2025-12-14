import { Module } from '@nestjs/common'
import { WorkExperienceService } from './work-experience.service'
import { WorkExperienceController } from './work-experience.controller'
import {
  WorkExperience,
  WorkExperienceSchema,
} from './schema/work-experience.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService],
  imports: [
    MongooseModule.forFeature([
      { name: WorkExperience.name, schema: WorkExperienceSchema },
    ]),
  ],
})
export class WorkExperienceModule {}
