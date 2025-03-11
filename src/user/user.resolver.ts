import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Post } from 'src/post/post.entity';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Query(() => User)
  @UseInterceptors(CacheInterceptor)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User | null> {
    return await this.userService.getUser(id);
  }

  @Mutation(() => User)
	async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
		return await this.userService.createUser(createUserInput)
	}

  @Mutation(() => User)
	async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User | null> {
		return await this.userService.updateUser(updateUserInput);
	}

  @Mutation(() => Number)
	async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<number> {
		return await this.userService.deleteUser(id);
	}

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    return this.userService.getUserPosts(user.id);
  }
}
