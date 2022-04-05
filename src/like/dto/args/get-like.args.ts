import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetLikeArgs {
  @Field()
  @IsNotEmpty()
  id: string;
}
