import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'comment/entities/comment.entity';
import { AbstractModel } from 'common/abstract.model';
import { Like } from 'like/entities/like.entity';
import { Post } from 'post/entities/post.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User extends AbstractModel {
  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  @Field(() => [Like], { nullable: true })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
