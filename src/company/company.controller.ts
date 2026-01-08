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
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ApiTag } from '../app.types'
import { CompanyMapper } from './company.mapper'
import { CompanyDto } from './dto/company.dto'
import { BearerAuth } from '../common/decorators/bearer-auth-required.decorator'
import { ApiBadRequestResponse } from '../common/decorators/bad-request.decorator'
import { ApiNotFoundResponse } from '../common/decorators/not-found.decorator'
import { CompanyQueryDto } from './dto/company-query.dto'
import { ObjectIdValidationPipe } from '../common/validators/object-id.validation-pipe'
import { CompanyPaginatedResponseDto } from './dto/company-paginated-response.dto'

export const COMPANY_TAG_DESCRIPTION =
  'Companies I have worked for. This endpoint collection allows CRUD operations on companies.'

@Controller('companies')
@ApiTags(ApiTag.Company)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @BearerAuth()
  @ApiOperation({
    summary: 'Create a new company',
  })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: CompanyDto,
  })
  @ApiBadRequestResponse()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyDto> {
    const company = await this.companyService.create(createCompanyDto)
    return CompanyMapper.toDto(company)
  }

  @Get()
  @ApiOperation({ summary: 'List all companies I have worked at' })
  @ApiOkResponse({ type: CompanyPaginatedResponseDto })
  @ApiBadRequestResponse()
  async findAll(
    @Query() query: CompanyQueryDto,
  ): Promise<CompanyPaginatedResponseDto> {
    const { items: docs, total } = await this.companyService.findAll(query)
    const items = CompanyMapper.toDtos(docs)
    return {
      items,
      total,
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse('Company not found')
  async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<CompanyDto> {
    const company = await this.companyService.findOne(id)
    return CompanyMapper.toDto(company)
  }

  @Patch(':id')
  @BearerAuth()
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse('Company not found')
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDto> {
    const company = await this.companyService.update(id, updateCompanyDto)
    return CompanyMapper.toDto(company)
  }

  @Delete(':id')
  @BearerAuth()
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse('Company not found')
  async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<CompanyDto> {
    const company = await this.companyService.remove(id)
    return CompanyMapper.toDto(company)
  }
}
