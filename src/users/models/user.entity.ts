import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'common/abstract.model';
import { Entity, Column } from 'typeorm';

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
}
