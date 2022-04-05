import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'comment/entities/comment.entity';
import { AbstractModel } from 'common/abstract.model';
import { Like } from 'like/entities/like.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'user/entities/user.entity';

@ObjectType()
@Entity()
export class Post extends AbstractModel {
  @Field()
  @Column()
  text: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image_url: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags: string[];

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  @Field(() => [Like], { nullable: true })
  likes: Like[];
}
