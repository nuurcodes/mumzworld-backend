import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty()
  text: string;

  @Field()
  @IsNotEmpty()
  user_id: string;

  @Field()
  @IsNotEmpty()
  post_id: string;
}
