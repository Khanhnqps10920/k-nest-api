import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FlexibleObject, jsonResponseParsed, utils } from '../common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(body: RegisterDto) {
    const checkExist = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (checkExist) {
      throw new HttpException(
        'Email already in use, please use another email',
        401,
      );
    }

    const bodyData: IUser = {
      ...body,
      role: UserRole.CUSTOMER,
    };

    const hashedPassword = await bcrypt.hash(bodyData.password, utils.SALT);

    if (hashedPassword) {
      bodyData.password = hashedPassword;
    }

    const newUser = await this.userRepository.save(bodyData);

    if (!newUser) {
      throw new HttpException('Register failed, please try again', 401);
    }

    const { password: _, ...rest } = newUser;

    return rest;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByCond(cond: FlexibleObject) {
    return 'This is find by condition function';
  }

  async findOneByCond(cond: FlexibleObject) {
    const user = await this.userRepository.findOne(cond);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async insertAdmin(body: CreateUserDto) {
    const checkExist = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (checkExist) {
      throw new HttpException(
        'Email already in use, please use another email',
        401,
      );
    }

    const admin: IUser = {
      ...body,
      role: UserRole.ADMIN,
    };

    const hashedPassword = await bcrypt.hash(admin.password, utils.SALT);

    if (!hashedPassword) {
      throw new HttpException('Something went wrong', 400);
    }

    admin.password = hashedPassword;

    const newAdmin = await this.userRepository.save(admin);

    // _ mean not use
    const { password: _, ...rest } = newAdmin;

    return jsonResponseParsed(201, rest, 'Insert admin success');
  }
}
