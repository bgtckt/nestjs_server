import { Field, ID, InputType } from '@nestjs/graphql'
import { IsAlpha, IsEmail } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
	id: number

  @IsAlpha()
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string
}