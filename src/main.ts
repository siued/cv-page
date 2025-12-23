import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { apiReference } from '@scalar/nestjs-api-reference'
import * as fs from 'fs'
import * as path from 'path'
import { WORK_EXPERIENCE_TAG_DESCRIPTION } from './work-experience/work-experience.controller'
import { COMPANY_TAG_DESCRIPTION } from './company/company.controller'
import { CONTACT_TAG_DESCRIPTION } from './contact/contact.controller'
import { APP_TAG_DESCRIPTION } from './app.controller'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe())

  const configBuilder = new DocumentBuilder()
  const port = configService.getOrThrow('PORT')
  const domain = configService.getOrThrow('DOMAIN')
  const protocol = configService.getOrThrow('PROTOCOL')
  const environment = configService.get('ENVIRONMENT')
  const server = `${protocol}://${domain}${port && environment === 'local' ? `:${port}` : ''}`
  const description = fs.readFileSync(
    path.join(__dirname, 'init/app-description.md'),
    'utf-8',
  )
  const config = configBuilder
    .setTitle('Matej Kučera')
    .setDescription(description)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag(
      'CV',
      'My CV data including work experiences, education, skills, and projects.',
    )
    .addTag('Work Experiences', WORK_EXPERIENCE_TAG_DESCRIPTION)
    .addTag('Companies', COMPANY_TAG_DESCRIPTION)
    .addTag('Contacts', CONTACT_TAG_DESCRIPTION)
    .addTag('App', APP_TAG_DESCRIPTION)
    .build()

  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      // ex. WorkExperienceController_get => WorkExperience.get
      `${controllerKey.replace('Controller', '')}.${methodKey}`,
  }

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      url: server,
    },
    customSiteTitle: 'Matej Kučera API Docs',
    customfavIcon: '/assets/favicon.ico',
    yamlDocumentUrl: 'openapi.yaml',
    jsonDocumentUrl: 'openapi.json',
  }

  const document = SwaggerModule.createDocument(app, config, documentOptions)

  // set up Swagger
  SwaggerModule.setup('/docs/swagger', app, document, customOptions)

  // set up Scalar
  app.use(
    '/docs/scalar',
    apiReference({
      url: '/openapi.json',
      // override default config where needed
      hideClientButton: true,
      authentication: {
        preferredSecurityScheme: 'bearer',
        securitySchemes: {
          bearer: {
            token: 'placeholder',
          },
        },
      },
      documentDownloadType: 'json',
      darkMode: true,
      favicon: '/assets/favicon.ico',
      metaData: {
        title: 'Matej Kučera API Docs',
      },
      operationTitleSource: 'path',
      orderSchemaPropertiesBy: 'preserve',
      persistAuth: true,
      theme: 'kepler',
      operationsSorter: 'method',
    }),
  )

  // Redirect root to default API docs (Scalar)
  // Cannot host Scalar at root because it hijacks all other URLs as a SPA
  app.getHttpAdapter().get('/', (req, res) => {
    res.redirect('/docs/scalar')
  })

  await app.listen(port)
}

bootstrap()
