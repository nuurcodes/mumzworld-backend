import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  image_url?: string;
}
