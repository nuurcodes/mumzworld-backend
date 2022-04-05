import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  text: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
