import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from '../commons/dto/user/register-user.dto';
import { UpdateUserDto } from '../commons/dto/user/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../controlers/models/jwt.payload';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userRepository.findOne({
      login: registerUserDto.login,
    });

    if (!user) {
      registerUserDto.password = await bcrypt.hash(
        registerUserDto.password,
        12,
      );
      return await this.userRepository.save(registerUserDto);
    }

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'user already exist',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async delete(id: number) {
    const res = await this.userRepository.delete(id);
    if (res.affected > 0) {
      return 'User have been deleted';
    }
    return 'User missed';
  }

  async patch(userDto: UpdateUserDto) {
    const res = await this.userRepository.update(userDto.id, {
      login: userDto.login,
    });
    if (res.affected > 0) {
      return 'User have been update';
    }
    return 'User missed';
  }

  getToken(jwtPayload: JwtPayload): {
    token: string;
  } {
    return { token: this.jwtService.sign(jwtPayload) };
  }

  async findUser(
    username,
    passwordParams,
  ): Promise<{
    id: string;
    username: string;
    password?: string;
  }> {
    const user = await this.userRepository.findOne({ login: username });

    const isPasswordMatch = await new Promise((res) => {
      bcrypt.compare(passwordParams, user.password, function (err, result) {
        if (!err && result) {
          res(true);
        }
        res(false);
      });
    });

    if (isPasswordMatch) {
      console.log(user);

      return {
        id: user.id.toString(),
        username: user.login,
        password: user.password,
      };
    }
    return null;
  }
}
