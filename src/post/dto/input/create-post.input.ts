import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  text: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
