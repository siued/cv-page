import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, ObjectId, Types } from 'mongoose'
import { Company } from '../../company/company.schema'
import { PositionLevel } from '../work-experience.types'
import { Skill, SkillSchema } from './skill.schema'
import { dateDifferenceInMillis } from '../../util/date.util'

@Schema({ timestamps: true })
export class WorkExperience {
  @Prop({
    required: true,
    ref: 'Company',
    type: mongoose.Schema.Types.ObjectId,
  })
  company: ObjectId

  @Prop({
    tpe: String,
    required: true,
  })
  position!: string

  @Prop({
    type: String,
    enum: Object.values(PositionLevel),
  })
  level?: PositionLevel

  @Prop({
    required: true,
    type: [SkillSchema],
  })
  skills!: Skill[]

  @Prop({
    type: Date,
    required: true,
  })
  startDate!: Date

  @Prop({
    type: Date,
    required: false,
  })
  endDate?: Date

  @Virtual({
    get(this: WorkExperience): number | undefined {
      if (!this.endDate) return undefined
      return dateDifferenceInMillis(this.startDate, this.endDate)
    },
  })
  durationYears?: number

  _id!: ObjectId
  createdAt!: Date
  updatedAt!: Date
}

export const WorkExperienceSchema = SchemaFactory.createForClass(WorkExperience)

// override type correctly as per https://docs.nestjs.com/techniques/mongodb#subdocuments
export type WorkExperienceDocumentOverride = {
  skills: Types.DocumentArray<Skill>
}

export type WorkExperienceDocument = HydratedDocument<
  WorkExperience,
  WorkExperienceDocumentOverride
>

export type WorkExperiencePopulatedDocument = Omit<
  WorkExperienceDocument,
  'company'
> & {
  company: Company
}
