import { BadRequestException } from '@nestjs/common'
import { ObjectIdValidationPipe } from './object-id.validation-pipe'
import * as mongoose from 'mongoose'

describe('ObjectIdValidationPipe', () => {
  let pipe: ObjectIdValidationPipe

  beforeEach(() => {
    pipe = new ObjectIdValidationPipe()
  })

  it('should return value if valid ObjectId', () => {
    const validId = new mongoose.Types.ObjectId().toHexString()
    expect(pipe.transform(validId)).toBe(validId)
  })

  it('should throw BadRequestException if invalid ObjectId', () => {
    expect(() => pipe.transform('invalid-id')).toThrow(BadRequestException)
  })

  it('should return a string', () => {
    const validId = new mongoose.Types.ObjectId().toHexString()
    expect(typeof pipe.transform(validId)).toBe('string')
  })
})
