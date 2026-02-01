import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { UserDto } from './models/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  public async getByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  public async register(userDto: UserDto) {
    userDto.role = "user";
    const hash = await bcrypt.hash(userDto.password, 10);
    userDto.password = hash;
    const user = this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }

}
