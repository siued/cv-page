import { Test, TestingModule } from '@nestjs/testing'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'
import { getModelToken } from '@nestjs/mongoose'

describe('ContactController', () => {
  let controller: ContactController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        ContactService,
        {
          provide: getModelToken('Contact'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<ContactController>(ContactController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
