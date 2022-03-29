import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;
}
