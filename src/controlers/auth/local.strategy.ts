import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '../../lib';
import { UserService } from '../../services/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  validate(username: string, password: string) {
    return this.userService.findUser(username, password);
  }
}
