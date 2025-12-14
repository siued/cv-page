import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { WorkExperienceService } from './work-experience.service'
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto'
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { BearerAuth } from '../common/decorators/bearer-auth-required.decorator'
import { WorkExperienceMapper } from './work-experience.mapper'
import { SkillMapper } from './skill.mapper'
import { WorkExperienceDto } from './dto/work-experience.dto'
import { SkillDto } from './dto/skill.dto'
import { WorkExperienceQueryDto } from './dto/work-experience-query.dto'
import { ApiBadRequestResponse } from '../common/decorators/bad-request.decorator'
import { ApiNotFoundResponse } from '../common/decorators/not-found.decorator'
import { ObjectIdValidationPipe } from '../common/validators/object-id.validation-pipe'

export const WORK_EXPERIENCE_TAG_DESCRIPTION =
  'My work experiences. This endpoint collection allows CRUD operations on work experiences. '

@Controller('work-experiences')
@ApiTags('Work Experiences')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  @BearerAuth()
  @ApiBadRequestResponse()
  async create(
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<WorkExperienceDto> {
    const result = await this.workExperienceService.create(
      createWorkExperienceDto,
    )
    return WorkExperienceMapper.toDto(result)
  }

  @Get()
  @ApiTags('CV')
  @ApiBadRequestResponse()
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: WorkExperienceQueryDto,
  ): Promise<WorkExperienceDto[]> {
    const results = await this.workExperienceService.findAll(query)
    return WorkExperienceMapper.toDtos(results)
  }

  @Get(':id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<WorkExperienceDto> {
    const result = await this.workExperienceService.findOne(id)
    return WorkExperienceMapper.toDto(result)
  }

  @Patch(':id')
  @BearerAuth()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<WorkExperienceDto> {
    const result = await this.workExperienceService.update(
      id,
      updateWorkExperienceDto,
    )
    return WorkExperienceMapper.toDto(result)
  }

  @Delete(':id')
  @BearerAuth()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<WorkExperienceDto> {
    const result = await this.workExperienceService.remove(id)
    return WorkExperienceMapper.toDto(result)
  }

  @Get(':id/skills')
  @ApiOperation({ summary: 'Get list of skills for a work experience' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async getSkills(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<SkillDto[]> {
    const skills =
      await this.workExperienceService.getSkillsByWorkExperienceId(id)
    return SkillMapper.toDtos(skills)
  }

  @Post(':id/skills')
  @BearerAuth()
  @ApiOperation({ summary: 'Add a skill to a work experience' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async addSkill(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() skillDto: SkillDto,
  ): Promise<WorkExperienceDto> {
    const workExperience =
      await this.workExperienceService.addSkillToWorkExperience(id, skillDto)
    return WorkExperienceMapper.toDto(workExperience)
  }

  @Delete(':id/skills/:skillShortName')
  @BearerAuth()
  @ApiOperation({ summary: 'Remove a skill from a work experience' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async removeSkill(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Param('skillShortName') skillShortName: string,
  ): Promise<WorkExperienceDto> {
    const workExperience =
      await this.workExperienceService.removeSkillFromWorkExperience(
        id,
        skillShortName,
      )
    return WorkExperienceMapper.toDto(workExperience)
  }
}
