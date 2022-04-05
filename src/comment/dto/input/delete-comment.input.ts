import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteCommentInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
