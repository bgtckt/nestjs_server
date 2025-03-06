import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    const user = new User();
    user.id = 1;
    user.name = "Ivan";
    user.email = "some@mail.ru";

    return [user];
  }
}
