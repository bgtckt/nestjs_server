import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>, @Inject(forwardRef(() => UserService)) private userService: UserService) {}

  async getPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return await this.postRepository.findBy({ userId });
  }

  async getPost(id: number): Promise<Post | null> {
    return await this.postRepository.findOne({ where: { id } });
  }

  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const newPost = this.postRepository.create(createPostInput);
    return await this.postRepository.save(newPost);
  }

  async deletePost(id: number): Promise<number> {
		await this.postRepository.delete({ id });
    return id;
	}

  async getUser(userId: number): Promise<User | null> {
    return await this.userService.getUser(userId);
  }
}
