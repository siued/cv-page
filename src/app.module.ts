import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WorkExperienceModule } from './work-experience/work-experience.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CompanyModule } from './company/company.module'
import { PublicModule } from './public/public.module'
import { ContactModule } from './contact/contact.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
    WorkExperienceModule,
    CompanyModule,
    PublicModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
