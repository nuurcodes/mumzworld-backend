import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Post extends AbstractModel {
  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  user_id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags: string[];
}
