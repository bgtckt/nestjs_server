import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class CreatePostInput {
  @IsNumber()
	@Field(() => Int)
	userId: number

	@Field()
	text: string
}