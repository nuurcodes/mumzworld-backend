import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class AbstractModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
}
