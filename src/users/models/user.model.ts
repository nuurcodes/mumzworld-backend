import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  password?: string;
}
