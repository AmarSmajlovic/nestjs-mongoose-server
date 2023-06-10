import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/users.service';
import { isPasswordMatch } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.usersService.findOne(email);

    if (user && (await isPasswordMatch(password, user.password))) {
      const { password: _, ...result } = user; // Exclude the password from the returned result
      return result;
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
