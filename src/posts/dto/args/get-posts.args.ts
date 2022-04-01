import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetPostsArgs {
  @Field(() => [String])
  @IsArray()
  postIds: string[];
}
