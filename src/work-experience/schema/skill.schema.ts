import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false })
export class Skill {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  shortName!: string

  @Prop({
    type: String,
    required: false,
  })
  description?: string
}

export const SkillSchema = SchemaFactory.createForClass(Skill)
