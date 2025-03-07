import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Post } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @OneToMany(() => Post, post => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}