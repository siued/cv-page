import { Injectable } from '@nestjs/common'
import { join } from 'node:path'
import * as fs from 'fs'

@Injectable()
export class CvService {
  getCvFileStream(): { fileBuffer: Buffer; filename: string } {
    const filename = 'matej_kucera_cv.pdf'
    const filePath = join(process.cwd(), 'public', 'assets', filename)
    const fileBuffer = fs.readFileSync(filePath)
    return { fileBuffer, filename }
  }
}
