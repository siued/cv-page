import { Test, TestingModule } from '@nestjs/testing'
import { CvService } from './cv.service'
import * as fs from 'fs'

jest.mock('fs')

describe('CvService', () => {
  let service: CvService

  beforeEach(async () => {
    ;(fs.readFileSync as jest.Mock).mockReset()
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvService],
    }).compile()

    service = module.get<CvService>(CvService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return the correct buffer and filename', () => {
    const mockBuffer = Buffer.from('pdf-content')
    ;(fs.readFileSync as jest.Mock).mockReturnValue(mockBuffer)
    const result = service.getCvFileStream()
    expect(result.fileBuffer).toBe(mockBuffer)
    expect(result.filename).toBe('matej_kucera_cv.pdf')
    expect(fs.readFileSync).toHaveBeenCalled()
  })
})
