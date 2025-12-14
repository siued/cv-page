import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { WORK_EXPERIENCE_TAG_DESCRIPTION } from './work-experience/work-experience.controller'
import { COMPANY_TAG_DESCRIPTION } from './company/company.controller'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe())

  const configBuilder = new DocumentBuilder()
  const port = configService.get('PORT')
  const domain = configService.getOrThrow('DOMAIN')
  const protocol = configService.getOrThrow('PROTOCOL')
  const config = configBuilder
    .addServer(`${protocol}://${domain}${port ? `:${port}` : ''}`)
    .setTitle('Matej Kučera')
    .setDescription(
      'Subtitle - something like passionate backend (full stack) software engineer',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag(
      'CV',
      'My CV data including work experiences, education, skills, and projects.',
    )
    .addTag('Work Experiences', WORK_EXPERIENCE_TAG_DESCRIPTION)
    .addTag('Companies', COMPANY_TAG_DESCRIPTION)
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(configService.getOrThrow('PORT'))
}
bootstrap()
