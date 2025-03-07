import { Field, InputType, Int } from '@nestjs/graphql'
import { IsAlpha, IsEmail } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
	id: number

  @IsAlpha()
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string
}