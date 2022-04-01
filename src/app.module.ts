import { Module } from '@nestjs/common';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { DatabaseModule } from 'database/database.module';
import { GraphQLModule } from 'global/graphql.module';
import { ConfigModule } from 'global/config.module';
import { ServeStaticModule } from 'global/serve-static.module';
import { PostsModule } from 'posts/posts.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    UsersModule,
    PostsModule,
    AuthModule,
    DatabaseModule,
    ServeStaticModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
