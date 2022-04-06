import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class AbstractModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly created_at: string;
}
