import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
