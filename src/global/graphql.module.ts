import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule as _GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    _GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
        cors: {
          origin: '*',
          credentials: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GraphQLModule {}
