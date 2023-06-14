import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { UserService } from 'src/user/users.service';
import { isPasswordMatch } from 'src/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  generateAccesToken(email: mongoose.Types.ObjectId): string {
    const jti = uuidv4();
    const payload = {
      aud: '1',
      jti,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
      sub: email,
      scopes: [],
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(username: string, password: string): Promise<any | null> {
    const user = await this.usersService.findUserByUsername(username);

    if (user && (await isPasswordMatch(password, user.password))) {
      const { password: _, ...result } = user; // Exclude the password from the returned result
      return result;
    }

    return null;
  }

  async login(@Req() req): Promise<any> {
    const user = req.user._doc;
    const access_token = this.generateAccesToken(user.email);
    return {
      meessage: 'User Info from Database',
      user: { ...req.user._doc, access_token },
    };
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    } else {
      const user = await this.usersService.findUserByEmail(req.user.email);
      if (user) {
        const access_token = this.generateAccesToken(user._id);
        return {
          message: 'User Info from Google',
          user: req.user,
          access_token,
        };
      }
      const storedUser = await this.usersService.store(req.user);
      const access_token = this.generateAccesToken(storedUser._id);
      return {
        message: 'Stored user',
        user: req.user,
        access_token,
      };
    }
  }

  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook';
    } else {
      const user = await this.usersService.findUserByEmail(req.user.email);
      if (user) {
        const access_token = this.generateAccesToken(user._id);
        return {
          message: 'User Info from Facebook',
          user: req.user,
          access_token,
        };
      }
      const storedUser = await this.usersService.store(req.user);
      const access_token = this.generateAccesToken(storedUser._id);
      return {
        message: 'Stored user',
        user: req.user,
        access_token,
      };
    }
  }
}
