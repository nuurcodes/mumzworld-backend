import { Module } from '@nestjs/common';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { GraphQLModule } from 'global/graphql.module';
import { ConfigModule } from 'global/config.module';
import { ServeStaticModule } from 'global/serve-static.module';
// import { PostsModule } from 'posts/posts.module';
import { TypeOrmModule } from 'global/typeorm.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    TypeOrmModule,
    UsersModule,
    // PostsModule,
    AuthModule,
    ServeStaticModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
