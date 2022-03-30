import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: true,
        cors: {
          origin: configService.get('CLIENT_URL'),
          credentials: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GlobalGraphQLModule {}
