import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';
import { Post } from 'post/entities/post.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'user/entities/user.entity';

@ObjectType()
@Entity()
export class Comment extends AbstractModel {
  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  post_id: string;

  @Field()
  @Column()
  user_id: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @Field(() => Post)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User)
  user: User;
}
