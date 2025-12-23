import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      useFactory: () => [
        {
          // docs from etc `public/docs/redocly.html` are served at `/docs/redocly`
          rootPath: join(process.cwd(), 'public', 'docs'),
          serveRoot: '/docs',
          serveStaticOptions: {
            extensions: ['html'],
            index: false,
          },
        },
        {
          // assets from `public/assets` are served at `/assets`
          rootPath: join(process.cwd(), 'public', 'assets'),
          serveRoot: '/assets',
        },
      ],
    }),
  ],
})
export class PublicModule {}
