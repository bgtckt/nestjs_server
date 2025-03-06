import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: number): Promise<User | null> {
		return await this.userRepository.findOne({ where: { id } });
	}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User | null> {
		await this.userRepository.update({ id: updateUserInput.id }, { ...updateUserInput });
		return await this.getUser(updateUserInput.id);
	}

  async deleteUser(id: number): Promise<number> {
		await this.userRepository.delete({ id });
		return id;
	}
}
