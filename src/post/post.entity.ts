import { Field, ObjectType, Int } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  text: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @ManyToOne(() => User, user => user.posts)
  @Field(() => User)
  user: User;
}