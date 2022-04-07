import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetLikeArgs {
  @Field()
  id?: string;

  @Field()
  user_id?: string;

  @Field()
  post_id?: string;
}
