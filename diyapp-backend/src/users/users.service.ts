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
    const existingEmail = await this.usersRepository.findOne({
      where: { email: userDto.email },
    });
    if (existingEmail) {
      throw new Error('Email is already in use');
    }

    const existingUsername = await this.usersRepository.findOne({
      where: { username: userDto.username },
    });
    if (existingUsername) {
      throw new Error('Username is already taken');
    }

    const hash = await bcrypt.hash(userDto.password, 10);

    const user = this.usersRepository.create({
      email: userDto.email,
      username: userDto.username,
      password: hash,
      role: 'user',
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      email: savedUser.email,
      username: savedUser.username,
      role: savedUser.role,
    };
  }

}
