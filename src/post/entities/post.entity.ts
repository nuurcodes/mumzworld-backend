import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from 'user/entities/user.entity';

@ObjectType()
@Entity()
export class Post extends AbstractModel {
  @Field()
  @Column()
  text: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags: string[];

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user: User;
}
