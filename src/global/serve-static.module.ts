import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule as _ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    _ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'uploads'),
      serveRoot: '/uploads/',
    }),
  ],
})
export class ServeStaticModule {}
