import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';

@ObjectType()
export class Post extends AbstractModel {
  @Field()
  userId: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
