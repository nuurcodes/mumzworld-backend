import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';
import { Post } from 'post/entities/post.entity';
import { User } from 'user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Like extends AbstractModel {
  @Field()
  @Column()
  post_id: string;

  @Field()
  @Column()
  user_id: string;

  @ManyToOne(() => Post, (post) => post.likes)
  @Field(() => Post)
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(() => User)
  user: User;
}
