import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteLikeInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
