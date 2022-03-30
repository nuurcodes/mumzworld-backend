import { Module } from '@nestjs/common';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { DatabaseModule } from 'database/database.module';
import { GlobalGraphQLModule } from 'global/graphql.module';
import { GlobalConfigModule } from 'global/config.module';

@Module({
  imports: [
    GlobalConfigModule,
    GlobalGraphQLModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
