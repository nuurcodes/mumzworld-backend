import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field()
  @IsNotEmpty()
  postId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  imageUrl?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
