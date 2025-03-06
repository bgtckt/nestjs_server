import { Field, InputType } from '@nestjs/graphql'
import { IsAlpha, IsEmail } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsAlpha()
	@Field()
	name: string

  @IsEmail()
  @Field()
	email: string
}