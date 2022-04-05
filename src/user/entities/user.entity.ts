import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';
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
  imageUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
