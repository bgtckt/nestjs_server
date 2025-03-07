import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { User } from 'src/user/user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Query(() => Post)
  async getPost(@Args('id', { type: () => Int }) id: number) {
    return await this.postService.getPost(id);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postService.createPost(createPostInput);
  }

  @Mutation(() => Number)
	async deletePost(@Args('id', { type: () => Int }) id: number): Promise<number> {
    return await this.postService.deletePost(id);
	}

  @ResolveField(() => User)
	async user(@Parent() post: Post): Promise<User | null> {
    return await this.postService.getUser(post.userId);
	}
}
