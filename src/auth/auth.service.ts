import { Injectable, Req } from '@nestjs/common';
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

  async login(@Req() req): Promise<any> {
    const user = req.user._doc;
    const payload = { username: user.username, sub: user._id };
    const accesToken = this.jwtService.sign(payload);
    return {
      meessage: 'User Info from Database',
      user: { ...req.user._doc, accesToken },
    };
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
