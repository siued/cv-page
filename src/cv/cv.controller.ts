import { Controller, Get, Header, StreamableFile } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CvService } from './cv.service'
import { ApiTag } from '../app.types'

@Controller('cv')
@ApiTags(ApiTag.CV)
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get('file')
  @ApiOperation({ summary: 'Download my CV as a PDF file' })
  @ApiResponse({
    status: 200,
    description: 'The CV PDF file',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Header('Content-Type', 'application/pdf')
  getCvFile(): StreamableFile {
    const { fileBuffer, filename } = this.cvService.getCvFileStream()
    return new StreamableFile(fileBuffer, {
      disposition: `attachment; filename=\"${filename}\"`,
      type: 'application/pdf',
    })
  }
}
