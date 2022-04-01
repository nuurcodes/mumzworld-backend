import { Module } from '@nestjs/common';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { GraphQLModule } from 'global/graphql.module';
import { ConfigModule } from 'global/config.module';
import { ServeStaticModule } from 'global/serve-static.module';
import { TypeOrmModule } from 'global/typeorm.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    TypeOrmModule,
    UserModule,
    PostModule,
    AuthModule,
    ServeStaticModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
