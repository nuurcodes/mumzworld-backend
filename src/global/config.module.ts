import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    _ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_EXPIRATION: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_URI: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
