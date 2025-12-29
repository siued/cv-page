import { Test, TestingModule } from '@nestjs/testing'
import { CvController } from './cv.controller'
import { CvService } from './cv.service'
import { StreamableFile } from '@nestjs/common'

describe('CvController', () => {
  let controller: CvController
  let service: CvService

  const mockFileBuffer = Buffer.from('test-pdf-content')
  const mockFilename = 'matej_kucera_cv.pdf'

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvController],
      providers: [
        {
          provide: CvService,
          useValue: {
            getCvFileStream: jest.fn().mockReturnValue({
              fileBuffer: mockFileBuffer,
              filename: mockFilename,
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<CvController>(CvController)
    service = module.get<CvService>(CvService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return a StreamableFile with correct headers and filename', () => {
    const result = controller.getCvFile()
    expect(result).toBeInstanceOf(StreamableFile)

    expect(result.getStream()).toBeDefined()

    expect(result.options.disposition).toContain(mockFilename)
    expect(result.options.type).toBe('application/pdf')
  })
})
