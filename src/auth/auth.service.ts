import { Injectable } from '@nestjs/common';
import { FlexibleObject } from '../common/utils';
import { IUser } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, password): Promise<Omit<IUser, 'password'>> {
    const cond: FlexibleObject = {
      where: {
        email,
      },
    };
    const user = await this.usersService.findOneByCond(cond);

    console.log(user);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password: _, ...result } = user;

        return result;
      }
    }

    return null;
  }

  async login(user: IUser) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
