import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { EducationService } from './education.service'
import { CreateEducationDto } from './dto/create-education.dto'
import { UpdateEducationDto } from './dto/update-education.dto'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiTag } from '../app.types'
import { BearerAuth } from '../common/decorators/bearer-auth-required.decorator'
import { EducationMapper } from './education.mapper'
import { EducationDto } from './dto/education.dto'
import { EducationQueryDto } from './dto/education-query.dto'
import { ApiBadRequestResponse } from '../common/decorators/bad-request.decorator'
import { ApiNotFoundResponse } from '../common/decorators/not-found.decorator'
import { ObjectIdValidationPipe } from '../common/validators/object-id.validation-pipe'
import { EducationPaginatedResponseDto } from './dto/education-paginated-response.dto'

@Controller('education')
@ApiTags(ApiTag.Education)
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @BearerAuth()
  @ApiOperation({ summary: 'Create an education record' })
  @ApiBadRequestResponse()
  async create(
    @Body() createEducationDto: CreateEducationDto,
  ): Promise<EducationDto> {
    const result = await this.educationService.create(createEducationDto)
    return EducationMapper.toDto(result)
  }

  @Get()
  @ApiOperation({ summary: 'List all education records' })
  @ApiOkResponse({ type: EducationPaginatedResponseDto })
  @ApiBadRequestResponse()
  @ApiTags(ApiTag.CV)
  async findAll(
    @Query() query: EducationQueryDto,
  ): Promise<EducationPaginatedResponseDto> {
    const { items: docs, total } = await this.educationService.findAll(query)
    const items = EducationMapper.toDtos(docs)
    return { items, total }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single education record by id' })
  @ApiOkResponse({ type: EducationDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<EducationDto> {
    const doc = await this.educationService.findOne(id)
    return EducationMapper.toDto(doc)
  }

  @Patch(':id')
  @BearerAuth()
  @ApiOperation({ summary: 'Update an education record' })
  @ApiOkResponse({ type: EducationDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ): Promise<EducationDto> {
    const doc = await this.educationService.update(id, updateEducationDto)
    return EducationMapper.toDto(doc)
  }

  @Delete(':id')
  @BearerAuth()
  @ApiOperation({ summary: 'Delete an education record' })
  @ApiOkResponse({ type: EducationDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<EducationDto> {
    const doc = await this.educationService.remove(id)
    return EducationMapper.toDto(doc)
  }
}
