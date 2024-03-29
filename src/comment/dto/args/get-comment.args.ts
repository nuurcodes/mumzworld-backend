import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetCommentArgs {
  @Field()
  @IsNotEmpty()
  id: string;
}
